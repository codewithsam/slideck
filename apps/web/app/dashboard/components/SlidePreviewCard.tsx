"use client";

import { Id } from "@/convex/_generated/dataModel";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Hash } from "lucide-react";
import { MouseEventHandler } from "react";

export function SlidePreviewCard({
  slide,
  idx,
  onSlideClick,
}: {
  slide: {
    _id: Id<"slides">;
    title?: string;
    content: string;
  };
  idx: number;
  onSlideClick: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <Card onClick={onSlideClick} className="bg-[#0f172a] border-gray-700 text-gray-200 hover:shadow-lg transition-all">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="items-center justify-center">
          <div className="flex flex-row text-4xl items-center justify-center text-muted-foreground">
            <Hash size={64} /> Slide {idx}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
