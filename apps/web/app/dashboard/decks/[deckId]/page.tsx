"use client";

import { Protect } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { SlidePreviewCard } from "@/app/dashboard/components/SlidePreviewCard";
import { Button } from "@workspace/ui/components/button";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";

import { Share2, MoreHorizontalIcon, Trash2Icon, BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Slides({ params }: { params: { deckId: Id<"decks"> } }) {
  const { deckId } = useParams();
  const router = useRouter();
  const slides = useQuery(api.slides.getSlidesByDeckId, {
    deckId: deckId as Id<"decks">,
  });
  const deleteDeck = useMutation(api.decks.deleteDeck);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [_, setIsDeleting] = useState(false);

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
          <h1 className="text-2xl font-semibold">Slides</h1>
          <ButtonGroup>
            <Button variant="outline" size="lg">
              <BadgePlus />
              Add Slide
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" aria-label="More Options">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Share2 />
                    Share With Members
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={(e) => {
                          e.preventDefault(); // Prevent dropdown from closing
                        }}
                      >
                        <Trash2Icon />
                        Delete Deck
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the deck and all its slides.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteDeck} className="bg-red-600 hover:bg-red-700">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {slides?.map((slide) => (
            <div
              key={slide._id}
              onClick={() => router.push(`/dashboard/decks/${deckId}/slides/${slide._id}`)}
              className="transition-transform hover:-translate-y-1 hover:shadow-md duration-150"
            >
              <SlidePreviewCard slide={slide} />
            </div>
          ))}
        </div>
      </div>
    </Protect>
  );
}
