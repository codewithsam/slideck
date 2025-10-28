"use client";

import { Card } from "@workspace/ui/components/card";

export function SlidePreviewCard({ slide }: { slide: any }) {
  const hasContent = slide.content && slide.content.trim().length > 0;
  // TODO: better use screenshots

  return (
    <Card className="aspect-[4/3] overflow-hidden border border-border rounded-2xl shadow-sm bg-white cursor-pointer transition duration-150">
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {hasContent ? (
          <div
            className="w-full h-full p-3 text-sm text-left overflow-hidden"
            dangerouslySetInnerHTML={{ __html: sanitizeSlideContent(slide.content) }}
          />
        ) : (
          <p className="text-muted-foreground text-sm">Empty Slide</p>
        )}
        <div className="absolute top-2 right-3 text-xs text-muted-foreground">#{slide.order}</div>
      </div>
    </Card>
  );
}

function sanitizeSlideContent(html: string) {
  return html.replace(/<script[^>]*>.*?<\/script>/gi, "").replace(/on\w+="[^"]*"/g, "");
}
