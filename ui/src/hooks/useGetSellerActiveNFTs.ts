"use client";

import { useReadContract } from "wagmi";
import { CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS } from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import type { ListingWithTokenURIType } from "@/types";

export function useGetSellerActiveNFTs(sellerAddress: `0x${string}`) {
  const {
    data: activeNFTs,
    isPending,
    isError,
    error,
  } = useReadContract({
    address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
    abi: cryptoCanvasMarketplaceABI.abi,
    functionName: "getSellerActiveListingsWithTokenURI",
    args: [sellerAddress],
  });

  return {
    activeNFTs: activeNFTs as ListingWithTokenURIType[],
    isActiveNFTsPending: isPending,
    isActiveNFTsError: isError,
    ActiveNFTsError: error,
  };
}
