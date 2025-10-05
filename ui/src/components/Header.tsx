"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Explore", href: "/explore" },
];

export const Header = () => {
  const pathname = usePathname();
  const account = useAccount();
  return (
    <header className="flex w-full items-center justify-between gap-3 px-2 py-3">
      {/* logo */}
      <Link href={"/"} className="flex items-center">
        <span className="sr-only">CryptoCanvas</span>
        <Image
          src={"/logo.svg"}
          alt="CryptoCanvas Logo"
          width={40}
          height={40}
        />
        <h1 className="text-primary ml-2 hidden text-2xl font-bold md:block">
          CryptoCanvas
        </h1>
      </Link>

      {/* navigation, mode toggle, mobile menu, and connect wallet button */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* navigation */}
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-md hover:text-primary font-medium transition-colors",
                pathname === item.href ? "text-primary" : "text-secondary",
              )}
            >
              {item.label}
            </Link>
          ))}
          {/* only show if account is connected */}
          {account.isConnected && (
            <>
              <Link
                key="/My Art"
                href="/my-art"
                className={cn(
                  "text-md hover:text-primary font-medium transition-colors",
                  pathname === "/my-art" ? "text-primary" : "text-secondary",
                )}
              >
                My Art
              </Link>
              <Link
                key="/create"
                href="/create"
                className={cn(
                  "text-md hover:text-primary font-medium transition-colors",
                  pathname === "/create" ? "text-primary" : "text-secondary",
                )}
              >
                Create
              </Link>
            </>
          )}
        </nav>
        {/* connect wallet button */}
        <ConnectButton
          showBalance={false}
          accountStatus={"avatar"}
          chainStatus={"icon"}
        />
        {/* mode toggle */}
        <ModeToggle />
        {/* mobile menu */}
      </div>
    </header>
  );
};
