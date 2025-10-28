import { query } from "./_generated/server";
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

        return slides;
    },
});