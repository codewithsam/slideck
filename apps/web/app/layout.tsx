import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import Navigation from "@/components/Navigation";
import SyncClerkUserToConvex from "@/components/SyncClerkUserToConvex";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <style>{`
          .collaboration-cursor__label {
            display: none;
          }
        `}</style>
        <Providers>
          <SyncClerkUserToConvex />
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
