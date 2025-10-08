"use client";

import { NFTCard } from "@/components/NFTCard";
import { useGetSellerActiveNFTs } from "@/hooks/useGetSellerActiveNFTs";
import React from "react";
import { useAccount } from "wagmi";

const MyArtPage = () => {
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
    return <div>Please connect your wallet to view your art.</div>;
  }

  // handle loading state
  if (isActiveNFTsPending) {
    return <div>Loading...</div>;
  }

  // handle error state
  if (isActiveNFTsError) {
    return <div>Error: {ActiveNFTsError?.message}</div>;
  }

  // handle empty state
  if (activeNFTs.length === 0) {
    return <div>No active NFTs found.</div>;
  }

  return (
    <section className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {activeNFTs.map((nft) => (
        <NFTCard key={nft.listingId} {...nft} />
      ))}
    </section>
  );
};

export default MyArtPage;
