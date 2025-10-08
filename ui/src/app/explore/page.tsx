"use client";

import { NFTCard } from "@/components/NFTCard";
import { useGetAllNFTs } from "@/hooks/useGetAllNFTs";
import React from "react";

const AllNFTsPage = () => {
  const {
    allActiveNFTs,
    isAllActiveNFTsPending,
    isAllActiveNFTsError,
    allActiveNFTsError,
  } = useGetAllNFTs();

  if (isAllActiveNFTsPending) {
    return <div>Loading...</div>;
  }

  if (isAllActiveNFTsError) {
    return <div>Error: {allActiveNFTsError?.message}</div>;
  }

  if (allActiveNFTs?.length === 0) {
    return <div>No NFTs found.</div>;
  }

  console.log("All Active NFTs:", allActiveNFTs);
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allActiveNFTs?.map((nft) => (
        <NFTCard key={nft.listingId.toString()} {...nft} />
      ))}
    </section>
  );
};

export default AllNFTsPage;
