"use client";

import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function TiptapBox({ id }: { id: string }) {
  const liveblocks = useLiveblocksExtension({ field: `box-${id}` });

  const editor = useEditor({
    extensions: [StarterKit, ...(liveblocks ? [liveblocks as any] : [])],
    immediatelyRender: false,
    content: "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert dark:prose-invert max-w-none w-full h-full p-2 outline-none text-gray-100 bg-transparent",
      },
    },
  });
  if (!editor) return null;

  return (
    <div className="w-full h-full relative">
      <EditorContent editor={editor} className="editor w-full h-full" />
      <FloatingToolbar editor={editor} />
    </div>
  );
}
