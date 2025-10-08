"use client";

import type { NFTMetadataType } from "@/types";
import React from "react";

export function useGetNFTMetaDataFromIPFSURI() {
  const [metadata, setMetadata] = React.useState<NFTMetadataType | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [lastFetchedURI, setLastFetchedURI] = React.useState<string | null>(
    null,
  );

  const getIPFSMetadata = React.useCallback(
    async (uri: string) => {
      // Prevent duplicate fetches for the same URI
      if (uri === lastFetchedURI && metadata) {
        return;
      }

      try {
        setLoading(true);
        setLastFetchedURI(uri);
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMetadata(data as NFTMetadataType);
      } catch (error) {
        console.error("Error fetching URI data:", error);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    },
    [lastFetchedURI, metadata],
  );

  return { metadata, getIPFSMetadata, loading };
}
