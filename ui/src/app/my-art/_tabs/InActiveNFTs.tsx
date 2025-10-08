"use client";

import React from "react";
import { NFTCard } from "@/components/NFTCard";
import { useAccount } from "wagmi";
import { useGetSellerInActiveNFTs } from "@/hooks/useGetSellerInActiveNFTs";

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
    return <div>Please connect your wallet to view your art.</div>;
  }

  // handle loading state
  if (isInActiveNFTsPending) {
    return <div>Loading...</div>;
  }

  // handle error state
  if (isInActiveNFTsError) {
    return <div>Error: {InActiveNFTsError?.message}</div>;
  }

  // handle empty state
  if (InActiveNFTs.length === 0) {
    return <div>No inactive NFTs found.</div>;
  }

  return (
    <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <h2 className="col-span-full text-2xl font-bold">Inactive NFTs</h2>
      {InActiveNFTs.map((nft) => (
        <NFTCard key={nft.listingId} {...nft} />
      ))}
    </section>
  );
};
