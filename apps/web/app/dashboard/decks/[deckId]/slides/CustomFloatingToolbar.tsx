import { Button } from "@workspace/ui/components/button";
import { Bold, Italic, List, Undo, Redo } from "lucide-react";
import { RefObject } from "react";

export default function CustomFloatingToolbar({
  editor,
  isToolbarVisible,
  toolbarRef,
}: {
  editor: any;
  isToolbarVisible: boolean;
  toolbarRef: RefObject<HTMLDivElement | null>;
}) {
  if (!editor) return null;

  if (isToolbarVisible) {
    return (
      <div
        ref={toolbarRef}
        className="absolute z-10 flex gap-1 p-1.5 rounded-lg border border-gray-700 bg-black/60 backdrop-blur-md shadow-lg transition-opacity duration-200"
        style={{
          top: "-45px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className={editor.isActive("bold") ? "bg-gray-700 text-white" : "text-gray-300 hover:text-white"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={editor.isActive("italic") ? "bg-gray-700 text-white" : "text-gray-300 hover:text-white"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
      </div>
    );
  }
}
