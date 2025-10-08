"use client";

import React from "react";
import type { ListingWithTokenURIType } from "@/types";
import { formatEther } from "viem";
import { useGetNFTMetaDataFromIPFSURI } from "@/hooks/useGetNFTMetaDataFromIPFSURI";
import { Button } from "./ui/button";
import Link from "next/link";

export const NFTCard = ({
  listingId,
  tokenId,
  active,
  listedAt,
  price,
  tokenURI,
}: ListingWithTokenURIType) => {
  const { getIPFSMetadata, loading, metadata } = useGetNFTMetaDataFromIPFSURI();

  React.useEffect(() => {
    const fetchData = async () => {
      if (tokenURI) {
        await getIPFSMetadata(tokenURI);
      }
    };
    void fetchData();
  }, [tokenURI]);

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 shadow transition-shadow hover:shadow-lg">
      {/* image */}
      <div>
        {loading && <p>Loading...</p>}
        {metadata && (
          <img
            src={metadata.image}
            alt={metadata.name}
            className="h-auto w-full object-contain"
          />
        )}
      </div>
      {/* details show minimal data */}
      <div>
        <h2>NFT Details</h2>
        <p>Listing ID: {listingId}</p>
        <p>Token ID: {tokenId}</p>
        <p>Active: {active ? "Yes" : "No"}</p>
        <p>Listed At: {listedAt}</p>
        <p>Price: {formatEther(price)}</p>
      </div>

      {/* View more details */}
      <Link href={`/my-art/${listingId}`}>
        <Button variant="link">View more details</Button>
      </Link>
    </div>
  );
};
