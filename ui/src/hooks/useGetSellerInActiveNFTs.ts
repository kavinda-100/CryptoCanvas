"use client";

import { useReadContract } from "wagmi";
import { CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS } from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import type { ListingWithTokenURIType } from "@/types";

export function useGetSellerInActiveNFTs(sellerAddress: `0x${string}`) {
  const {
    data: inActiveNFTs,
    isPending,
    isError,
    error,
    refetch,
  } = useReadContract({
    address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
    abi: cryptoCanvasMarketplaceABI.abi,
    functionName: "getSellerInActiveListingsWithTokenURI",
    args: [sellerAddress],
  });

  return {
    InActiveNFTs: inActiveNFTs as ListingWithTokenURIType[],
    isInActiveNFTsPending: isPending,
    isInActiveNFTsError: isError,
    InActiveNFTsError: error,
    refetchInActiveNFTs: refetch,
  };
}
