"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SyncClerkUserToConvex() {
  const { user, isSignedIn } = useUser();
  const upsertUser = useMutation(api.users.upsertUser);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    // Extract Clerk fields safely
    const clerkUserId = user.id;
    const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses?.[0]?.emailAddress ?? "";
    const name = user.fullName ?? user.username ?? "";
    const imageUrl = user.imageUrl ?? "";

    upsertUser({
      clerkUserId,
      email,
      name,
      imageUrl,
    }).catch((err) => console.error("Failed to sync user to Convex:", err));
  }, [isSignedIn, user, upsertUser]);

  return null;
}
