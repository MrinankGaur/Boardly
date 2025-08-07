// "use client";

// import Image from "next/image";
// import { EmptySearch } from "./empty-search";
// import { EmptyFavorites } from "./empty-favorites";
// import { EmptyBoards } from "./empty-boards";


// interface BoardListProps{
//     orgId: string;
//     query: {
//        search?:string;
//        favorites?: string; 
//     }
// }

// export const BoardList = ({
//     orgId,
//     query
// }:BoardListProps) => {

//     const data = []; // TODO: change to api call

//     if(!data?.length && query.search){
//         return <EmptySearch/>
//     }

//     if(!data?.length && query.favorites){
//         return <EmptyFavorites/>
//     }
//     if(!data?.length){
//         return  <EmptyBoards/>
//     }


//     return (
//         <div>
//             {JSON.stringify(query)}
//         </div>
//     )
// }
"use client";

import { useSearchParams } from "next/navigation";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyBoards } from "./empty-boards";

interface BoardListProps {
  orgId: string;
}

export const BoardList = ({ orgId }: BoardListProps) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const favorites = searchParams.get("favorite") || searchParams.get("favorites") || undefined;

  const data = []; // TODO: replace with real API call

  if (!data?.length && search) {
    return <EmptySearch />;
  }

  if (!data?.length && favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return <div>{JSON.stringify({ search, favorites })}</div>;
};
