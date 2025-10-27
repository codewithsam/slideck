"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { LiveblocksProvider } from "@liveblocks/react/suspense";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}>{children}</LiveblocksProvider>
    </NextThemesProvider>
  );
}
