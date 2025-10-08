"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetSingleListingDetails } from "@/hooks/useGetSingleListingDetails";
import { useGetNFTMetaDataFromIPFSURI } from "@/hooks/useGetNFTMetaDataFromIPFSURI";

export const ListedNFTFullDetailsPage = () => {
  const params = useParams<{ listingID: string }>();
  const { getIPFSMetadata, metadata, loading } = useGetNFTMetaDataFromIPFSURI();

  // check if params.listingID is valid
  if (!params?.listingID) {
    return <div>Invalid listing ID.</div>;
  }
  // convert listingID to number
  const listingID = Number(params.listingID);
  if (isNaN(listingID) || listingID <= 0) {
    return <div>Invalid listing ID.</div>;
  }

  const {
    singleListing,
    isSingleListingLoading,
    isSingleListingError,
    singleListingError,
  } = useGetSingleListingDetails(listingID);

  if (isSingleListingLoading) {
    return (
      <section className="container mx-auto w-full">
        <div>Loading...</div>
      </section>
    );
  }

  if (isSingleListingError) {
    return (
      <section className="container mx-auto w-full">
        <div>Error: {singleListingError?.message}</div>
      </section>
    );
  }
  if (!singleListing) {
    return (
      <section className="container mx-auto w-full">
        <div>No listing found for ID {listingID}.</div>
      </section>
    );
  }

  // Fetch metadata from IPFS
  React.useEffect(() => {
    if (singleListing.tokenURI) {
      getIPFSMetadata(singleListing.tokenURI);
    }
  }, [singleListing.tokenURI]);

  return (
    <section className="container mx-auto w-full">
      {/* OpenSea style page */}
    </section>
  );
};
