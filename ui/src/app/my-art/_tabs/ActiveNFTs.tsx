"use client";

import React from "react";
import { NFTCard } from "@/components/NFTCard";
import { useGetSellerActiveNFTs } from "@/hooks/useGetSellerActiveNFTs";
import { useAccount } from "wagmi";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Wallet, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const ActiveNFTs = () => {
  const account = useAccount();
  // get the active nfts listed by the user
  const {
    activeNFTs,
    isActiveNFTsPending,
    isActiveNFTsError,
    ActiveNFTsError,
  } = useGetSellerActiveNFTs(account.address!);
  console.log("Active NFTs:", activeNFTs);

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
              Please connect your wallet to view your art collection.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle loading state
  if (isActiveNFTsPending) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Loading Your NFTs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Fetching your active listings from the blockchain...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle error state
  if (isActiveNFTsError) {
    return (
      <Card className="mx-auto max-w-md border-red-200 dark:border-red-800">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
            <TrendingUp className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100">
              Error Loading NFTs
            </h3>
            <p className="mt-1 text-sm text-red-600 dark:text-red-300">
              {ActiveNFTsError?.message ??
                "Failed to load your NFTs. Please try again."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle empty state
  if (activeNFTs.length === 0) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/20">
            <TrendingUp className="h-8 w-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              No Active NFTs
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You haven&apos;t listed any NFTs for sale yet. Create your first
              NFT to get started!
            </p>
          </div>
          <Link href="/create">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First NFT
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
            Active Listings
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            <span className="text-primary font-bold">{activeNFTs.length}</span>{" "}
            NFT{activeNFTs.length === 1 ? "" : "s"} currently listed for sale
          </p>
        </div>
        <Link href="/create">
          <Button
            variant="outline"
            className="hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New NFT
          </Button>
        </Link>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activeNFTs.map((nft) => (
          <div
            key={nft.listingId}
            className="transform transition-all duration-200 hover:scale-[1.02]"
          >
            <NFTCard {...nft} />
          </div>
        ))}
      </div>
    </section>
  );
};
