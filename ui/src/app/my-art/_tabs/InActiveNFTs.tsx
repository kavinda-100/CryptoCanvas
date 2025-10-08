"use client";

import React from "react";
import { NFTCard } from "@/components/NFTCard";
import { useAccount } from "wagmi";
import { useGetSellerInActiveNFTs } from "@/hooks/useGetSellerInActiveNFTs";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Wallet, ShoppingBag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const InActiveNFTs = () => {
  const account = useAccount();
  // get the active nfts listed by the user
  const {
    InActiveNFTs,
    isInActiveNFTsPending,
    isInActiveNFTsError,
    InActiveNFTsError,
  } = useGetSellerInActiveNFTs(account.address!);
  console.log("InActive NFTs:", InActiveNFTs);

  // if not connected, show a message
  if (!account.isConnected) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
            <Wallet className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Connect Your Wallet
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Please connect your wallet to view your sold NFTs.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle loading state
  if (isInActiveNFTsPending) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Loading Sold NFTs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Fetching your sold NFTs from the blockchain...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle error state
  if (isInActiveNFTsError) {
    return (
      <Card className="mx-auto max-w-md border-red-200 dark:border-red-800">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
            <ShoppingBag className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100">
              Error Loading NFTs
            </h3>
            <p className="mt-1 text-sm text-red-600 dark:text-red-300">
              {InActiveNFTsError?.message ??
                "Failed to load your sold NFTs. Please try again."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle empty state
  if (InActiveNFTs.length === 0) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/20">
            <ShoppingBag className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              No Sold NFTs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You haven&apos;t sold any NFTs yet. Keep creating and listing your
              art!
            </p>
          </div>
          <Link href="/create">
            <Button
              variant="outline"
              className="hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Create More NFTs
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sold NFTs
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            {InActiveNFTs.length} NFT{InActiveNFTs.length === 1 ? "" : "s"}{" "}
            successfully sold
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          <span className="font-medium">Completed Sales</span>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {InActiveNFTs.map((nft) => (
          <div
            key={nft.listingId}
            className="transform opacity-90 transition-all duration-200 hover:scale-[1.02] hover:opacity-100"
          >
            <NFTCard {...nft} />
          </div>
        ))}
      </div>
    </section>
  );
};
