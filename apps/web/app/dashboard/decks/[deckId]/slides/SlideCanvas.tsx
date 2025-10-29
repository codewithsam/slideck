"use client";

import { LiveObject } from "@liveblocks/client";
import { useStorage, useMutation } from "@liveblocks/react/suspense";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { TiptapBox } from "./TiptapBox";
import { GripVertical } from "lucide-react";

type Box = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function SlideCanvas() {
  const boxes = useStorage((root) => root.boxes);
  const updateBoxPosition = useUpdateBoxPosition();

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    const id = active.id as string;
    updateBoxPosition(id, delta.x, delta.y);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-full aspect-video rounded-2xl border border-gray-700 bg-[#071026]/60 overflow-hidden">
        {boxes.map((box: any) => {
          const { id, x, y, width, height } = box;
          return (
            <DraggableBox key={box.id} id={id} x={x} y={y} width={width} height={height}>
              <TiptapBox id={box.id} />
            </DraggableBox>
          );
        })}

        <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#94a3b833_1px,transparent_0)] bg-[length:24px_24px]" />
      </div>
    </DndContext>
  );
}

function DraggableBox({ id, x, y, width, height, children }: Box & { children?: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

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
        className="cursor-grab active:cursor-grabbing p-1 border-b border-gray-700 flex justify-center text-gray-400 hover:text-gray-100"
      >
        <GripVertical className="h-4 w-4" />
      </div>
      {children}
    </div>
  );
}

export function useAddBox() {
  return useMutation(({ storage }) => {
    const id = crypto.randomUUID();
    storage.get("boxes").push(
      new LiveObject({
        id,
        height: 140,
        width: 140,
        x: 100 + Math.random() * 150,
        y: 80 + Math.random() * 100,
      })
    );
  }, []);
}

function useUpdateBoxPosition() {
  return useMutation(({ storage }, id: string, dx: number, dy: number) => {
    const boxes = storage.get("boxes");
    const box = boxes.find((b) => b.get("id") === id);
    if (!box) return;

    box.set("x", box.get("x") + dx);
    box.set("y", box.get("y") + dy);
  }, []);
}

// Export hook directly on component
SlideCanvas.useAddBox = useAddBox;
