import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getSlidesByDeckId = query({
    args: { deckId: v.id("decks") },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()
        if (!user) {
            throw new ConvexError("Unauthorized")
        }
        const deck = await ctx.db.get(args.deckId);
        if (!deck) return null;
        if (deck.ownerId !== user.subject && !deck.sharedWith.includes(user.subject)) {
            throw new ConvexError("Unauthorized");
        }
        const slides = await ctx.db.query("slides").withIndex("by_deck_and_order", q => q.eq("deckId", args.deckId)).order("asc").collect();

        return { slides, deckTitle: deck.title, deckDescription: deck.description };
    },
});

export const getSlideById = query({
    args: { slideId: v.id("slides") },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) throw new ConvexError("Unauthorized");

        const slide = await ctx.db.get(args.slideId);
        if (!slide) return null;

        const deck = await ctx.db.get(slide.deckId);
        if (!deck) return null;
        const canAccess =
            deck.ownerId === user.subject ||
            deck.sharedWith?.includes(user.subject) ||
            slide.sharedWith?.includes(user.subject);

        if (!canAccess) {
            throw new ConvexError("Unauthorized");
        }

        return slide;
    },

});

export const createSlide = mutation({
    args: { deckId: v.id("decks"), title: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) throw new ConvexError("Unauthorized");

        const deck = await ctx.db.get(args.deckId);
        if (!deck) throw new ConvexError("Deck not found");

        if (deck.ownerId !== user.subject && !deck.sharedWith?.includes(user.subject)) {
            throw new ConvexError("Access denied");
        }

        const slideId = await ctx.db.insert("slides", {
            deckId: args.deckId,
            title: args.title ?? "Untitled Slide",
            content: "",
            order: Date.now(),
            sharedWith: [],
            isPublic: false,
        });

        return slideId;
    },
});

export const shareSlide = mutation({
    args: {
        slideId: v.id("slides"),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        // Find sender (owner)
        const sender = await ctx.db
            .query("users")
            .withIndex("by_clerkUserId", (q) => q.eq("clerkUserId", identity.subject))
            .unique();
        if (!sender) throw new Error("Sender not found");

        // Find recipient by email
        const targetUser = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .unique();
        if (!targetUser) throw new Error("User not found");

        // Prevent self-sharing
        if (targetUser.clerkUserId === sender.clerkUserId) {
            throw new Error("Cannot share with yourself");
        }

        // Get the slide
        const slide = await ctx.db.get(args.slideId);
        if (!slide) throw new Error("Slide not found");

        // Fetch deck to verify ownership
        const deck = await ctx.db.get(slide.deckId);
        if (!deck) throw new Error("Parent deck not found");

        if (deck.ownerId !== sender.clerkUserId) {
            throw new Error("Only deck owner can share slides");
        }

        // Prevent duplicate
        if (slide.sharedWith.includes(targetUser.clerkUserId)) {
            return { alreadyShared: true };
        }

        // Append new user
        await ctx.db.patch(args.slideId, {
            sharedWith: [...slide.sharedWith, targetUser.clerkUserId],
        });

        return { success: true };
    },
});

export const getSharedSlides = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const userId = identity.subject;

        // fetch all slides the user has access to
        const allSlides = await ctx.db.query("slides").collect();

        // filter slides where current user is in sharedWith
        const sharedSlides = allSlides.filter((slide) =>
            Array.isArray(slide.sharedWith) && slide.sharedWith.includes(userId)
        );

        return sharedSlides;
    },
});