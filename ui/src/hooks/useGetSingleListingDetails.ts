"use client";

import { useReadContract } from "wagmi";
import { CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS } from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import type { ListingWithTokenURIType } from "@/types";

export function useGetSingleListingDetails(listingID: number) {
  const { data, isLoading, isError, error, refetch } = useReadContract({
    address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
    abi: cryptoCanvasMarketplaceABI.abi,
    functionName: "getSingleListingWithTokenURI",
    args: [BigInt(listingID)],
  });

  return {
    singleListing: data as ListingWithTokenURIType | undefined,
    isSingleListingLoading: isLoading,
    isSingleListingError: isError,
    singleListingError: error,
    refetchSingleListing: refetch,
  };
}
