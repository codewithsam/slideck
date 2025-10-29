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
import { Button } from "@workspace/ui/components/button";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { Share2, MoreHorizontalIcon, Trash2Icon, BadgePlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ShareDeckDialog } from "@/app/dashboard/components/ShareDeckDialog";
import { Dialog, DialogContent, DialogTrigger } from "@workspace/ui/components/dialog";
import { Id } from "@/convex/_generated/dataModel";

export default function DeckActions({
  handleAddSlide,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  handleDeleteDeck,
  deckId,
}: {
  handleAddSlide: () => Promise<void>;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteDeck: () => Promise<void>;
  deckId: any;
}) {
  return (
    <ButtonGroup>
      <Button variant="outline" size="lg" onClick={handleAddSlide}>
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
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Share2 />
                  Share With Members
                </DropdownMenuItem>
              </DialogTrigger>

              <ShareDeckDialog deckId={deckId} />
            </Dialog>
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
  );
}
