import { Kalam } from "next/font/google";
import { colorToCss , cn} from "@/lib/utils";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
});

const calculateFontSize = (width: number, height: number, text:string) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeBasedOnHeight = height * scaleFactor /(text.length * 0.1);
    const fontSizeBasedOnWidth = (width * scaleFactor)  / (text.length * 0.1);;
    const minFontSize = 12;
    return Math.max(
        minFontSize,
        Math.min(fontSizeBasedOnHeight,fontSizeBasedOnWidth,maxFontSize)
    );
}

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}:TextProps ) => {
    const { x, y, width, height, fill, value} = layer;

    const updateValue = useMutation((
        {storage},
        newValue: string,
    )=>{
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value",newValue);
    },[])

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e)=> onPointerDown(e,id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none"
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-start text-center drop-shadow-md outline-none p-2",
                    font.className
                )}
                style={{
                    fontSize: calculateFontSize(width, height, value || "Text"),
                    color: fill ? colorToCss(fill) : "#000",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    minHeight: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
/>
        </foreignObject>
    );
};