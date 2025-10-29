"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@workspace/ui/components/dialog";
import { Id } from "@/convex/_generated/dataModel";

export function ShareSlideDialog({ slideId }: { slideId: Id<"slides"> }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const shareSlide = useMutation(api.slides.shareSlide);

  const handleShare = async () => {
    setLoading(true);
    try {
      await shareSlide({ slideId, email });
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="bg-[#0f172a] border-gray-700 text-gray-200">
      <DialogHeader>
        <DialogTitle>Share this slide</DialogTitle>
      </DialogHeader>

      <div className="space-y-3 py-2">
        <Input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-black/40 border-gray-700 text-gray-200 placeholder:text-gray-500"
        />
        {status === "success" && <p className="text-green-400 text-sm">Slide shared successfully.</p>}
        {status === "error" && <p className="text-red-400 text-sm">Could not share. Check email.</p>}
      </div>

      <DialogFooter>
        <Button disabled={loading || !email} onClick={handleShare} className="bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "Sharing..." : "Share"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
