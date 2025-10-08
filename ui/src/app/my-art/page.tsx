"use client";

import { useGetSellerActiveNFTs } from "@/hooks/useGetSellerActiveNFTs";
import { useRouter } from "next/navigation";
import React from "react";
import { useAccount } from "wagmi";

const MyArtPage = () => {
  const account = useAccount();
  const router = useRouter();

  // Redirect to home if not connected
  React.useEffect(() => {
    if (!account.isConnected) {
      router.push("/");
    }
  }, [account, router]);

  // get the active nfts listed by the user
  const {
    activeNFTs,
    isActiveNFTsPending,
    isActiveNFTsError,
    ActiveNFTsError,
  } = useGetSellerActiveNFTs(account.address!);

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
          <p>Price: {nft.price.toString()} wei</p>
        </div>
      ))}
    </section>
  );
};

export default MyArtPage;
