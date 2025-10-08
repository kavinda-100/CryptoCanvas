"use client";

import { useGetSellerActiveNFTs } from "@/hooks/useGetSellerActiveNFTs";
import React from "react";
import { formatEther } from "viem";
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
    <section className="w-full">
      {activeNFTs.map((nft) => (
        <div key={nft.listingId.toString()} className="mb-4 border p-4">
          <h2 className="text-lg font-bold">{nft.tokenURI}</h2>
          <p>Price: {formatEther(nft.price)} ETH</p>
        </div>
      ))}
    </section>
  );
};

export default MyArtPage;
