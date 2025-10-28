"use client";

import { Button } from "@workspace/ui/components/button";
import { Ellipsis, FileChartPie } from "lucide-react";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function DeckList() {
  const decks = useQuery(api.decks.getAccessibleDecks);

  return (
    <div className="p-8 cursor-pointer">
      <section className="grid grid-cols-4 gap-4 mt-8">
        {decks ? (
          decks.map((deck) => (
            <Link href={`/dashboard/decks/${deck._id}`} className="group" key={deck._id}>
              <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-800/60 hover:bg-gray-800/75 transition-shadow shadow-sm hover:shadow-md text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-indigo-600/10 group-hover:bg-indigo-600/20">
                  <FileChartPie className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">{deck.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{deck.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}
