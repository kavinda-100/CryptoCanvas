"use client";

import { NFTCard } from "@/components/NFTCard";
import { useGetUserPurchasedNFTs } from "@/hooks/useGetUserPurchaseNFTs";
import React from "react";
import { useAccount } from "wagmi";

export const UserPurchasedNFTs = () => {
  const account = useAccount();
  const {
    userPurchasedNFTs,
    isUserPurchasedNFTsPending,
    isUserPurchasedNFTsError,
    userPurchasedNFTsError,
  } = useGetUserPurchasedNFTs(account.address!);

  if (isUserPurchasedNFTsPending) {
    return <div>Loading...</div>;
  }

  if (isUserPurchasedNFTsError) {
    return <div>Error: {userPurchasedNFTsError?.message}</div>;
  }

  if (userPurchasedNFTs?.length === 0) {
    return <div>No purchased NFTs found.</div>;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {userPurchasedNFTs?.map((nft) => (
        <NFTCard key={nft.listingId.toString()} {...nft} />
      ))}
    </div>
  );
};
