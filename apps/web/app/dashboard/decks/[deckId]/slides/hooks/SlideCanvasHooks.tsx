import { LiveObject } from "@liveblocks/client";
import { useMutation } from "@liveblocks/react";

export function useAddBox() {
  return useMutation(({ storage }) => {
    const id = crypto.randomUUID();
    storage.get("boxes").push(
      new LiveObject({
        id,
        height: 100,
        width: 300,
        x: 100 + Math.random() * 150,
        y: 80 + Math.random() * 100,
      })
    );
  }, []);
}

export function useDeleteBox() {
  return useMutation(({ storage }, id: string) => {
    const boxes = storage.get("boxes");
    const index = boxes.findIndex((b) => b.get("id") === id);
    if (index !== -1) {
      boxes.delete(index);
    }
  }, []);
}

export function useUpdateBoxPosition() {
  return useMutation(({ storage }, id: string, dx: number, dy: number) => {
    const boxes = storage.get("boxes");
    const box = boxes.find((b) => b.get("id") === id);
    if (!box) return;

    box.set("x", box.get("x") + dx);
    box.set("y", box.get("y") + dy);
  }, []);
}
