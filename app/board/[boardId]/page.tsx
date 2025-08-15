import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";
import { use } from "react";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string;
    }>;
}

const BoardIdPage = ({
    params,
}: BoardIdPageProps) => {
    const resolvedParams = use(params);
    
    return (
        <Room roomId={resolvedParams.boardId} fallback={<Loading/>}>
            <Canvas boardId={resolvedParams.boardId}/>
        </Room>
    );
};

export default BoardIdPage;