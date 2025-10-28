"use client";

import { Button } from "@workspace/ui/components/button";
import { Ellipsis } from "lucide-react";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import Link from "next/link";
import { api } from "./../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function DeckList() {
  const decks = useQuery(api.decks.get);

  return (
    <div className="p-8">
      <section className="grid grid-cols-4 gap-4 mt-8">
        {decks ? (
          decks.map((deck) => (
            <Card key={deck._id}>
              <Link href={`/dashboard/deck/${deck._id}`}>
                <CardHeader>
                  <CardTitle>{deck.title}</CardTitle>
                  <CardDescription>{deck.description}</CardDescription>
                  <CardAction>
                    <Button variant="outline">
                      <Ellipsis />
                    </Button>
                  </CardAction>
                </CardHeader>
              </Link>
            </Card>
          ))
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}
