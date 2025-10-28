export default function DashboardLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, string | undefined>;
}>) {
  return (
    <>
      <div className="min-h-screen w-full relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
          }}
        />
        <div className="min-h-screen">{children}</div>
      </div>
    </>
  );
}
