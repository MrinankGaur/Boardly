import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships"
import { query } from "./_generated/server";
import { favorite } from "./board";
import type { Id } from "./_generated/dataModel";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        if(args.favorites){
            const favoritedBoards = await ctx.db
                .query("useFavorites")
                .withIndex("by_user_org",(q)=>
                    q   
                        .eq("userId",identity.subject)
                        .eq("orgId",args.orgId)
                )
                .order("desc")
                .collect()
            const ids = favoritedBoards.map((b) => b.boardId);
            let boards = await getAllOrThrow(ctx.db, ids);

            // Apply search filter to favorite boards if search term is provided
            if(args.search){
                boards = boards.filter(board => 
                    board.title.toLowerCase().includes(args.search!.toLowerCase())
                );
            }

            return boards.map((board)=>({
                ...board,
                isFavorite: true,
            }));

        }

        const title = args.search as string;

        let boards =[];

        if(title){
            boards = await ctx.db
                        .query("boards")
                        .withSearchIndex("search_title",(q)=>
                            q
                                .search("title",title)
                                .eq("orgId",args.orgId)
                        )
                        .collect();
        }else{
            boards = await ctx.db
                .query("boards")
                .withIndex("by_org", (q)=>
                    q.
                        eq("orgId",args.orgId)
                )
                .order("desc")
                .collect();
        }

        

        const boardsWithFavoriteRelation = boards.map((board)=>{
            return ctx.db
                .query("useFavorites")
                .withIndex("by_user_board",(q)=>
                    q
                        .eq("userId",identity.subject)
                        .eq("boardId",board._id)
                )
                .unique()
                .then((favorite)=>{
                    return{
                        ...board,
                        isFavorite: !!favorite,
                    };
                });
        });

        const boardsWithFavoriteBoolean = await Promise.all(boardsWithFavoriteRelation);

        return boardsWithFavoriteBoolean;
    },
});