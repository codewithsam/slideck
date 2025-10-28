import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col h-100 pt-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
      </div>
      <div className="m-auto">
        <SignIn forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
}
