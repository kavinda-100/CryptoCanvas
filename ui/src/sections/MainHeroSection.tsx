"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SparklesText } from "@/components/SparklesText";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";

const MainHeroSection = () => {
  return (
    <div className="bg-background relative container mx-auto min-h-screen overflow-hidden py-10 lg:py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient blobs */}
        <div className="bg-primary/10 absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full blur-3xl delay-700" />
        <div className="bg-primary/5 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl delay-1000" />

        {/* Floating SVG decorations */}
        <div className="animate-float absolute top-20 right-20 opacity-20">
          <Image
            src="/svgIcons/ethereum-icon.svg"
            alt="Ethereum"
            width={80}
            height={80}
          />
        </div>
        <div className="animate-float absolute bottom-40 left-10 opacity-20 delay-500">
          <Image
            src="/svgIcons/nft-card.svg"
            alt="NFT Card"
            width={100}
            height={100}
          />
        </div>
        <div className="animate-float absolute top-40 left-1/4 opacity-15 delay-1000">
          <Image
            src="/svgIcons/artist-palette.svg"
            alt="Artist Palette"
            width={70}
            height={70}
          />
        </div>
        <div className="animate-float absolute right-1/4 bottom-20 opacity-15 delay-700">
          <Image
            src="/svgIcons/nft-card.svg"
            alt="NFT Card"
            width={90}
            height={90}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Section - Image and Content */}
        <div className="order-2 flex flex-col gap-8 px-4 lg:order-1 lg:px-0">
          {/* Image with decorative frame */}
          <div className="group relative">
            <div className="from-primary via-primary/50 to-primary absolute -inset-1 rounded-lg bg-gradient-to-r opacity-75 blur-sm transition duration-300 group-hover:opacity-100" />
            <div className="border-primary/20 bg-card relative overflow-hidden rounded-lg border-2">
              <Image
                src={"/hero-one.png"}
                alt={"NFT Image"}
                width={600}
                height={800}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>

          {/* Description and CTA */}
          <div className="flex flex-col gap-6">
            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
              Welcome to the{" "}
              <span className="text-primary font-bold">
                future of digital ownership
              </span>
              ! Our NFT marketplace is the ultimate destination for creators,
              collectors, and investors.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border-primary/20 bg-card/50 flex flex-col items-center gap-2 rounded-lg border p-4 backdrop-blur-sm">
                <Users className="text-primary h-6 w-6" />
                <span className="text-2xl font-bold">10K+</span>
                <span className="text-muted-foreground text-xs">Artists</span>
              </div>
              <div className="border-primary/20 bg-card/50 flex flex-col items-center gap-2 rounded-lg border p-4 backdrop-blur-sm">
                <TrendingUp className="text-primary h-6 w-6" />
                <span className="text-2xl font-bold">50K+</span>
                <span className="text-muted-foreground text-xs">NFTs</span>
              </div>
              <div className="border-primary/20 bg-card/50 flex flex-col items-center gap-2 rounded-lg border p-4 backdrop-blur-sm">
                <Zap className="text-primary h-6 w-6" />
                <span className="text-2xl font-bold">$5M+</span>
                <span className="text-muted-foreground text-xs">Volume</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="default"
                size="lg"
                asChild
                className="group relative overflow-hidden"
              >
                <Link href="/explore" className="flex items-center gap-2">
                  Explore NFTs
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/create">Create NFT</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section - Hero Title */}
        <div className="order-1 flex h-full w-full flex-col items-center justify-center gap-8 px-4 lg:order-2 lg:px-0">
          <div className="flex w-full flex-col gap-6">
            {/* Decorative top bar with animation */}
            <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
              <div className="via-primary absolute inset-0 w-1/3 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent" />
            </div>

            {/* Main heading */}
            <h1 className="flex flex-col gap-4 text-5xl leading-tight font-extrabold lg:text-7xl xl:text-8xl">
              <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-transparent">
                Start Making
              </span>
              <span className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-transparent">
                Money With
              </span>
              <SparklesText
                text="NFTs"
                textClassName="text-5xl font-extrabold lg:text-7xl xl:text-8xl"
              />
            </h1>

            {/* Decorative bottom bar */}
            <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
              <div className="via-primary absolute inset-0 w-1/3 animate-[shimmer_2s_infinite_reverse] bg-gradient-to-r from-transparent to-transparent" />
            </div>

            {/* Additional info cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border-primary/20 bg-card/50 hover:border-primary/40 rounded-lg border p-6 backdrop-blur-sm transition-all hover:shadow-lg">
                <h3 className="mb-2 text-lg font-bold">Create & Sell</h3>
                <p className="text-muted-foreground text-sm">
                  Mint your artwork as NFTs and reach a global audience of
                  collectors.
                </p>
              </div>
              <div className="border-primary/20 bg-card/50 hover:border-primary/40 rounded-lg border p-6 backdrop-blur-sm transition-all hover:shadow-lg">
                <h3 className="mb-2 text-lg font-bold">Trade & Earn</h3>
                <p className="text-muted-foreground text-sm">
                  Buy, sell, and trade NFTs on our secure and transparent
                  platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeroSection;
