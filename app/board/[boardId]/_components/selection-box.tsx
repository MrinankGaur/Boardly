"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { 
    useSelf,
    useStorage,

} from "@/liveblocks.config";
import { 
    LayerType,
    Side, 
    XYWH, 
} from "@/types/canvas";
import { memo } from "react";

interface SelectionBoxProps{
    onResizeHandlePointerDown: (corner: Side, intialBounds:XYWH)=>void;
}

const HandleWidth = 8;

export const SelectionBox = memo(({
    onResizeHandlePointerDown
}: SelectionBoxProps) => {
    
    const soleLayerId = useSelf((me)=>
        me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandle = useStorage((root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();
    if(!bounds){
        return null;
    }

    return (
        <>
            <rect
                className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
                style = {{
                    transform: `translate(${bounds.x}px, ${bounds.y}px)`,
                }}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />
        </>
    )
});