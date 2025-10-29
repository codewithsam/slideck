"use client";

import { useStorage } from "@liveblocks/react/suspense";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TiptapBox } from "./TiptapBox";
import { useAddBox, useUpdateBoxPosition } from "./hooks/SlideCanvasHooks";
import DraggableBox from "./DraggableBox";

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
      </div>
    </DndContext>
  );
}

SlideCanvas.useAddBox = useAddBox;
