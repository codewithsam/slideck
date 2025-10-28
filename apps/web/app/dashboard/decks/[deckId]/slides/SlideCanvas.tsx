"use client";

import { LiveObject } from "@liveblocks/client";
import { useStorage, useMutation } from "@liveblocks/react/suspense";

export default function SlideCanvas() {
  const boxes = useStorage((root) => root.boxes);

  return (
    <div className="relative w-full aspect-video rounded-2xl border border-gray-700 bg-[#071026]/60 overflow-hidden">
      {boxes.map((box: any) => (
        <div
          key={box.id}
          style={{
            position: "absolute",
            left: box.x,
            top: box.y,
            width: box.width,
            height: box.height,
          }}
        >
          Hello world
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,#94a3b833_1px,transparent_0)] bg-[length:24px_24px]" />
    </div>
  );
}

export function useAddBox() {
  return useMutation(({ storage }) => {
    let boxes = storage.get("boxes");
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

// Export hook directly on component
SlideCanvas.useAddBox = useAddBox;
