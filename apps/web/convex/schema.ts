import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    decks: defineTable({
        title: v.string(),
        description: v.string(),
        ownerId: v.string(),
        roomId: v.optional(v.string()),
        orgId: v.optional(v.string()),
        sharedWith: v.array(v.string()),
        isPublic: v.boolean()
    })
        .index("by_owner_id", ["ownerId"])
        .index("by_org_id", ["orgId"]),

    slides: defineTable({
        deckId: v.id("decks"),
        title: v.optional(v.string()),
        content: v.string(),
        order: v.number(),
        isPublic: v.boolean(),
        sharedWith: v.array(v.string()),
    })
        .index("by_deck_and_order", ["deckId", "order"])
})