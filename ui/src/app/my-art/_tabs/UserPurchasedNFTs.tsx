"use client";

import React from "react";
import { NFTCard } from "@/components/NFTCard";
import { useGetUserPurchasedNFTs } from "@/hooks/useGetUserPurchaseNFTs";
import { useAccount } from "wagmi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Wallet,
  ShoppingBag,
  Compass,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export const UserPurchasedNFTs = () => {
  const account = useAccount();
  const {
    userPurchasedNFTs,
    isUserPurchasedNFTsPending,
    isUserPurchasedNFTsError,
    userPurchasedNFTsError,
  } = useGetUserPurchasedNFTs(account.address!);

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
              Please connect your wallet to view your purchased NFTs.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle loading state
  if (isUserPurchasedNFTsPending) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Loading Your Collection
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Fetching your purchased NFTs from the blockchain...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle error state
  if (isUserPurchasedNFTsError) {
    return (
      <Card className="mx-auto max-w-md border-red-200 dark:border-red-800">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
            <ShoppingBag className="h-8 w-8 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100">
              Failed to Load Purchases
            </h3>
            <p className="mt-1 text-sm text-red-600 dark:text-red-300">
              {userPurchasedNFTsError?.message ??
                "Unable to fetch your purchased NFTs. Please try again later."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // handle empty state
  if (!userPurchasedNFTs || userPurchasedNFTs.length === 0) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/20">
            <ShoppingBag className="h-8 w-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              No Purchases Yet
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              You haven&apos;t purchased any NFTs yet. Start building your
              collection by exploring the marketplace!
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/explore">
                <Compass className="mr-2 h-4 w-4" />
                Explore NFTs
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/create">
                <TrendingUp className="mr-2 h-4 w-4" />
                Create NFT
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // render purchased NFTs
  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Your NFT Collection
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          You own {userPurchasedNFTs.length} NFT
          {userPurchasedNFTs.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* NFT Grid */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userPurchasedNFTs.map((nft) => (
          <div
            key={nft.listingId.toString()}
            className="transform transition-all duration-200 hover:scale-[1.02]"
          >
            <NFTCard {...nft} />
          </div>
        ))}
      </div>

      {/* Collection Stats */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Collection Summary
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total pieces owned: {userPurchasedNFTs.length}
              </p>
            </div>
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/20">
              <ShoppingBag className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
