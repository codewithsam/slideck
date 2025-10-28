"use client";

import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const create = mutation({
    args: { title: v.string(), description: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity()
        if (!user) {
            throw new ConvexError("Unauthorized")
        }
        const deckId = await ctx.db.insert("decks", {
            title: args.title,
            description: args.description,
            ownerId: user.subject,
            sharedWith: [],
            isPublic: false
        })
        await ctx.db.insert("slides", {
            deckId,
            title: "Untitled Slide",
            content: "",
            order: 1,
            isPublic: false,
            sharedWith: [],
        })
        return deckId
    }
})

export const getAccessibleDecks = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.auth.getUserIdentity()
        if (!user) {
            throw new ConvexError("Unauthorized")
        }
        const decks = await ctx.db.query("decks").collect();

        // TODO: optimize this by denormalizing it in future or making convex db follow relational joins

        return decks.filter(
            (deck) =>
                deck.ownerId === user.subject ||
                (Array.isArray(deck.sharedWith) &&
                    deck.sharedWith.includes(user.subject))
        );
    },
});

export const deleteDeck = mutation({
    args: { deckId: v.id("decks") },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) throw new ConvexError("Unauthorized");

        const deck = await ctx.db.get(args.deckId);

        if (!deck) throw new Error("Deck not found");
        if (deck.ownerId !== user.subject) throw new Error("Access denied");

        const slides = await ctx.db
            .query("slides")
            .withIndex("by_deck_and_order", q => q.eq("deckId", args.deckId))
            .collect();

        for (const slide of slides) {
            await ctx.db.delete(slide._id);
        }

        await ctx.db.delete(args.deckId)
        return { success: true }

    }
})