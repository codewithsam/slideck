"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { Protect } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft, Plus, RotateCcw, RotateCw } from "lucide-react";
import { RoomProvider, useOthers, useHistory } from "@liveblocks/react/suspense";
import SlideCanvas from "../SlideCanvas";
import { LiveList } from "@liveblocks/client";
import { Suspense } from "react";

export default function SlidePage() {
  const { slideId, deckId } = useParams<{ slideId: Id<"slides">; deckId: Id<"decks"> }>();

  const slide = useQuery(api.slides.getSlideById, { slideId });

  if (!slideId || !deckId) {
    return <div>Invalid parameters</div>;
  }

  if (slide === undefined)
    return <div className="flex items-center justify-center min-h-screen text-gray-300">Loading slide...</div>;

  if (slide === null)
    return <div className="flex items-center justify-center min-h-screen text-gray-400">Slide not found.</div>;

  return (
    <RoomProvider
      id={`slide-${slideId}`}
      initialPresence={{ isTyping: false }}
      initialStorage={{ boxes: new LiveList([]) }}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen text-gray-300">
            Loading collaborative session...
          </div>
        }
      >
        <SlideEditor slide={slide} deckId={deckId} />
      </Suspense>
    </RoomProvider>
  );
}

function SlideEditor({ slide, deckId }: { slide: Doc<"slides">; deckId: Id<"decks"> }) {
  const router = useRouter();
  const others = useOthers();
  const userCount = others.length;
  const addBox = SlideCanvas.useAddBox();
  const { canUndo, canRedo, undo, redo } = useHistory();

  return (
    <Protect>
      <div className="flex flex-col items-center justify-start min-h-screen text-gray-200 p-8 space-y-8">
        <div className="flex items-center justify-between w-full max-w-7xl">
          <Button
            variant="outline"
            size="lg"
            className="border-gray-700 bg-black/40 hover:bg-gray-800/60 text-gray-300"
            onClick={() => router.push(`/dashboard/decks/${deckId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Deck
          </Button>
          <div className="flex items-center gap-4">
            {userCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm text-gray-400">{userCount} online</span>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-100">{slide.title || "Untitled Slide"}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={undo}
            disabled={!canUndo}
            className="border-gray-700 bg-black/40 hover:bg-gray-800/60 text-gray-300"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={redo}
            disabled={!canRedo}
            className="border-gray-700 bg-black/40 hover:bg-gray-800/60 text-gray-300"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button onClick={addBox} variant="outline" size="lg" className="bg-black/30 border-gray-700 text-gray-200">
            <Plus className="mr-2 h-4 w-4" />
            Add Text Box
          </Button>
        </div>

        <div className="w-full max-w-7xl aspect-video rounded-2xl border border-gray-700 bg-[#0f172a]/70 shadow-xl flex items-center justify-center">
          <SlideCanvas />
        </div>
      </div>
    </Protect>
  );
}
