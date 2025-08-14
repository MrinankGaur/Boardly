"use client"

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { 
    Camera, 
    Color 
} from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";

interface SelectionToolsProps{
    camera: Camera;
    setLastUsedColor: (color: Color)=>void;
}

export const SelectionTools = memo(({
    camera,
    setLastUsedColor,
}: SelectionToolsProps)=>{

    const selection = useSelf((me) => me.presence.selection);

    const setFill = useMutation((
        {storage},
        fill: Color,
    ) => {

        const liveLayer = storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id)=>{
            liveLayer.get(id)?.set("fill",fill);
        })

    },[
        selection,
        setLastUsedColor,
    ])

    const selectinBounds = useSelectionBounds();

    if(!selectinBounds){
        return null;
    }

    const x = selectinBounds.width/2 + selectinBounds.x + camera.x;
    const y = selectinBounds.y + camera.y;

    return(
        <div 
            className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
            style={{
                transform: `translate(
                calc(${x}px - 50%),
                calc(${y-16}px - 100%) 
                )`
            }}    
        >
            <ColorPicker
                onChange = {setFill}
            />
        </div>
    )
});

SelectionTools.displayName = "SelectionTools";