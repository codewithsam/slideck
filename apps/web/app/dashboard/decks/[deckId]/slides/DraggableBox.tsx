import { useDraggable } from "@dnd-kit/core";
import { useDeleteBox } from "./hooks/SlideCanvasHooks";
import { Button } from "@workspace/ui/components/button";
import { GripVertical, Trash2 } from "lucide-react";

type Box = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function DraggableBox({ id, x, y, width, height, children }: Box & { children?: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const deleteBox = useDeleteBox();

  const style = {
    transform: transform
      ? `translate3d(${x + transform.x}px, ${y + transform.y}px, 0)`
      : `translate3d(${x}px, ${y}px, 0)`,
    width,
    height,
    position: "absolute" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group border rounded-lg bg-black/40 border-gray-600 shadow-md ${
        isDragging ? "border-blue-500 bg-blue-500/30" : ""
      }`}
    >
      <div
        {...listeners}
        {...attributes}
        className="flex flex-row justify-between cursor-grab active:cursor-grabbing p-1 border-b border-gray-700 text-gray-400 hover:text-gray-100"
      >
        <Button size={"icon-sm"} variant={"ghost"}>
          <GripVertical />
        </Button>
        <Button
          size={"icon-sm"}
          variant={"ghost"}
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            deleteBox(id);
          }}
          className="text-gray-500 hover:text-red-800 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </div>
  );
}
