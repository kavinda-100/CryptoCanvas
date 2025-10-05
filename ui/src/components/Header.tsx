"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { cn } from "@/lib/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MenuIcon,
  HomeIcon,
  InfoIcon,
  CompassIcon,
  PaletteIcon,
  PlusCircleIcon,
  SparklesIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "About", href: "/about", icon: InfoIcon },
  { label: "Explore", href: "/explore", icon: CompassIcon },
];

export const Header = () => {
  const pathname = usePathname();
  const account = useAccount();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between gap-3 px-4 py-4 transition-all duration-300 ease-in-out sm:px-6 lg:px-8",
        isScrolled
          ? "bg-background/80 border-border/50 border-b shadow-sm backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      {/* logo */}
      <Link href={"/"} className="group flex items-center">
        <span className="sr-only">CryptoCanvas</span>
        <div className="relative">
          <Image
            src={"/logo.svg"}
            alt="CryptoCanvas Logo"
            width={40}
            height={40}
            className="transition-transform duration-200 group-hover:scale-110"
          />
          <SparklesIcon className="text-primary absolute -top-1 -right-1 h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
        <h1 className="text-primary group-hover:text-primary/80 ml-3 hidden text-2xl font-bold transition-colors duration-200 md:block">
          CryptoCanvas
        </h1>
      </Link>

      {/* navigation, mode toggle, mobile menu, and connect wallet button */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* navigation */}
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-primary flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105",
                  "hover:bg-accent/50 rounded-lg px-3 py-2",
                  pathname === item.href
                    ? "text-primary bg-accent/30 shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          {/* only show if account is connected */}
          {account.isConnected && (
            <>
              <Link
                key="/my-art"
                href="/my-art"
                className={cn(
                  "hover:text-primary flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105",
                  "hover:bg-accent/50 rounded-lg px-3 py-2",
                  pathname === "/my-art"
                    ? "text-primary bg-accent/30 shadow-sm"
                    : "text-muted-foreground",
                )}
              >
                <PaletteIcon className="h-4 w-4" />
                My Art
              </Link>
              <Link
                key="/create"
                href="/create"
                className={cn(
                  "hover:text-primary flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:scale-105",
                  "hover:bg-accent/50 border-primary/20 rounded-lg border px-3 py-2",
                  pathname === "/create"
                    ? "text-primary bg-primary/10 border-primary/40 shadow-sm"
                    : "text-muted-foreground hover:border-primary/40",
                )}
              >
                <PlusCircleIcon className="h-4 w-4" />
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

        <div className="hidden md:block">
          {/* mode toggle */}
          <ModeToggle />
        </div>

        <div className="md:hidden">
          {/* mobile menu */}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
};

const MobileMenu = ({ navItems }: { navItems: NavItem[] }) => {
  const pathname = usePathname();
  const account = useAccount();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="hover:bg-accent/50 flex items-center justify-center rounded-lg p-2 transition-colors duration-200">
          <MenuIcon className="text-foreground h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-background/95 border-border/50 w-80 border-l backdrop-blur-xl"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="sr-only">CryptoCanvas Navigation</SheetTitle>
        </SheetHeader>

        {/* header */}
        <div className="mb-8 flex items-center justify-between px-3 pt-4">
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.svg"}
              alt="CryptoCanvas Logo"
              width={32}
              height={32}
            />
            <h2 className="text-primary text-xl font-bold">CryptoCanvas</h2>
          </div>
          <ModeToggle />
        </div>

        {/* connect wallet button for mobile
        <div className="mb-6 sm:hidden">
          <ConnectButton />
        </div> */}

        {/* navigation */}
        <div className="space-y-2 px-3">
          <div className="text-muted-foreground mb-4 text-xs font-medium tracking-wider uppercase">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  "hover:bg-accent/50 hover:scale-[0.98] active:scale-95",
                  pathname === item.href
                    ? "bg-primary/10 text-primary border-primary/20 border shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* authenticated links */}
          {account.isConnected && (
            <>
              <div className="text-muted-foreground mt-6 mb-4 text-xs font-medium tracking-wider uppercase">
                My Account
              </div>
              <Link
                key="/my-art"
                href="/my-art"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  "hover:bg-accent/50 hover:scale-[0.98] active:scale-95",
                  pathname === "/my-art"
                    ? "bg-primary/10 text-primary border-primary/20 border shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <PaletteIcon className="h-5 w-5 flex-shrink-0" />
                <span>My Art</span>
              </Link>
              <Link
                key="/create"
                href="/create"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                  "hover:bg-accent/50 border hover:scale-[0.98] active:scale-95",
                  pathname === "/create"
                    ? "bg-primary/10 text-primary border-primary/40 shadow-sm"
                    : "text-muted-foreground hover:text-foreground border-border/50 hover:border-primary/30",
                )}
              >
                <PlusCircleIcon className="h-5 w-5 flex-shrink-0" />
                <span>Create Art</span>
              </Link>
            </>
          )}
        </div>

        {/* footer info */}
        <div className="absolute right-6 bottom-6 left-6">
          <div className="text-muted-foreground text-center text-xs">
            <p className="flex items-center justify-center gap-1">
              Made with <SparklesIcon className="text-primary h-3 w-3" /> by
              CryptoCanvas
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
