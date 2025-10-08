"use client";

import { useReadContract } from "wagmi";
import { CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS } from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import type { ListingWithTokenURIType } from "@/types";

export function useGetUserPurchasedNFTs(userAddress: `0x${string}`) {
  const {
    data: userPurchasedNFTs,
    isPending,
    isError,
    error,
  } = useReadContract({
    address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
    abi: cryptoCanvasMarketplaceABI.abi,
    functionName: "getUserPurchasesWithTokenURI",
    args: [userAddress],
  });

  return {
    userPurchasedNFTs: userPurchasedNFTs as ListingWithTokenURIType[],
    isUserPurchasedNFTsPending: isPending,
    isUserPurchasedNFTsError: isError,
    userPurchasedNFTsError: error,
  };
}
