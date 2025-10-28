"use client";
import { Protect } from "@clerk/nextjs";
import Link from "next/link";
import { Layers, PlusCircle, FileText } from "lucide-react";

export default function DashboardPage() {
  return (
    <Protect>
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Your Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - View all decks */}
          <Link href="/dashboard/decks" className="group">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-800/60 hover:bg-gray-800/75 transition-shadow shadow-sm hover:shadow-md text-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-violet-600/10 group-hover:bg-violet-600/20">
                <Layers className="w-10 h-10 text-violet-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">View all decks</h3>
              <p className="mt-2 text-sm text-gray-300">Click here to view list of all decks you own</p>
            </div>
          </Link>

          {/* Card 2 - Create new deck */}
          <Link href="/dashboard/decks/new" className="group">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-800/60 hover:bg-gray-800/75 transition-shadow shadow-sm hover:shadow-md text-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-indigo-600/10 group-hover:bg-indigo-600/20">
                <PlusCircle className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Create new deck</h3>
              <p className="mt-2 text-sm text-gray-300">Start a new presentation deck</p>
            </div>
          </Link>

          {/* Card 3 - Import deck */}
          <Link href="/dashboard/import" className="group">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-gray-800/60 hover:bg-gray-800/75 transition-shadow shadow-sm hover:shadow-md text-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-lg bg-emerald-600/10 group-hover:bg-emerald-600/20">
                <FileText className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Import deck</h3>
              <p className="mt-2 text-sm text-gray-300">Upload or import a deck from file</p>
            </div>
          </Link>
        </div>
      </main>
    </Protect>
  );
}
