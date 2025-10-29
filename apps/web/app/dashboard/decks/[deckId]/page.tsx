"use client";

import { Protect } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SlidePreviewCard } from "@/app/dashboard/components/SlidePreviewCard";

import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogTrigger } from "@workspace/ui/components/dialog";
import { Share2 } from "lucide-react";
import { ShareSlideDialog } from "@/app/dashboard/decks/[deckId]/slides/ShareSlideDialog";

import { useEffect, useState } from "react";
import DeckActions from "../../components/DeckActions";

export default function Slides({ params }: { params: { deckId: Id<"decks"> } }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { deckId } = useParams();
  const router = useRouter();
  const slidesAndDeckData = useQuery(api.slides.getSlidesByDeckId, {
    deckId: deckId as Id<"decks">,
  });
  const slides = slidesAndDeckData?.slides;
  const deckTitle = slidesAndDeckData?.deckTitle;
  const deckDescription = slidesAndDeckData?.deckDescription;

  const deleteDeck = useMutation(api.decks.deleteDeck);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [_, setIsDeleting] = useState(false);

  const createSlide = useMutation(api.slides.createSlide);

  const handleAddSlide = async () => {
    if (!deckId) {
      console.error("No deck ID available");
      return;
    }
    try {
      const newSlideId = await createSlide({ deckId: deckId as Id<"decks"> });
      router.push(`/dashboard/decks/${deckId}/slides/${newSlideId}`);
    } catch (error) {
      console.error("Failed to create slide:", error);
    }
  };

  useEffect(() => {
    if (slides === null) {
      router.replace("/dashboard/decks");
    }
  }, [slides, router]);

  const handleDeleteDeck = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteDeck({ deckId: deckId as Id<"decks"> });
      if (!result?.success === true) throw new Error("Unable to delete");
      setIsDeleteDialogOpen(false);
      router.replace("/dashboard/decks");
    } catch (err) {
      console.error("Failed to delete deck:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (slides === undefined) return <div>Loading slides...</div>;
  if (slides?.length === 0) return <div>No slides yet.</div>;

  return (
    <Protect>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{deckTitle}</h1>
            <p className="text-sm">{deckDescription}</p>
          </div>
          <DeckActions
            handleAddSlide={handleAddSlide}
            isDeleteDialogOpen={isDeleteDialogOpen}
            handleDeleteDeck={handleDeleteDeck}
            setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            deckId={deckId}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {slides?.map((slide, idx) => (
            <div key={slide._id} className="transition-transform hover:-translate-y-1 hover:shadow-md duration-150">
              <SlidePreviewCard
                idx={idx}
                slide={slide}
                onSlideClick={() => router.push(`/dashboard/decks/${deckId}/slides/${slide._id}`)}
              />
              <div className="flex justify-end mt-4">
                <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-800">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </DialogTrigger>
                  <ShareSlideDialog slideId={slide._id} />
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Protect>
  );
}
