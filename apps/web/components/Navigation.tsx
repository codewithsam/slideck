"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@workspace/ui/components/button";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@workspace/ui/components/navigation-menu";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenu className="max-w-full z-10">
        <div className="flex items-center justify-between mx-auto px-4 py-3 w-full border-b-2 border-b-gray-800">
          <Link href="/" className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-sky-500"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.5 7 12 3.5 19.5 7 12 9.5zM2 17l10 5 10-5v-2.5L12 20 2 14.5V17z" />
            </svg>
            <span className="font-semibold text-lg">Slideck</span>
          </Link>
          <div className="flex ml-auto items-center gap-4">
            <Authenticated>
              <Link href="/dashboard" className="no-underline" prefetch={false}>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">Dashboard</Button>
              </Link>
              <UserButton />
            </Authenticated>
            <Unauthenticated>
              <NavigationMenuList className="flex items-center gap-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/login">Login</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/signup">Signup</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </Unauthenticated>
          </div>
        </div>
      </NavigationMenu>
    </>
  );
}
