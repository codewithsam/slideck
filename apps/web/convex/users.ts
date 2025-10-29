"use server";

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const upsertUser = mutation({
    args: {
        clerkUserId: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Try to find existing user by clerkUserId
        const existing = await ctx.db
            .query("users")
            .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
            .unique();

        // Update if user exists
        if (existing) {
            await ctx.db.patch(existing._id, {
                email: args.email,
                name: args.name ?? "",
                imageUrl: args.imageUrl ?? "",
                updatedAt: Date.now(),
            });
            return { updated: true, userId: existing._id };
        }

        // Otherwise, insert a new one
        const userId = await ctx.db.insert("users", {
            clerkUserId: args.clerkUserId,
            email: args.email,
            name: args.name ?? "",
            imageUrl: args.imageUrl ?? "",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        return { created: true, userId };
    },
});