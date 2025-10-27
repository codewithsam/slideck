import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "@/components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/login" signUpUrl="/signup" afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body>
          <Navigation />
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
