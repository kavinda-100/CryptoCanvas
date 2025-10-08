"use client";

import { useReadContract } from "wagmi";
import { CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS } from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import type { ListingWithTokenURIType } from "@/types";

export function useGetAllNFTs() {
  const {
    data: allActiveNFTs,
    isPending,
    isError,
    error,
  } = useReadContract({
    address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
    abi: cryptoCanvasMarketplaceABI.abi,
    functionName: "getAllListingsWithTokenURI",
    args: [],
  });

  return {
    allActiveNFTs: allActiveNFTs as ListingWithTokenURIType[],
    isAllActiveNFTsPending: isPending,
    isAllActiveNFTsError: isError,
    allActiveNFTsError: error,
  };
}
