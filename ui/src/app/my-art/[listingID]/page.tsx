"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetSingleListingDetails } from "@/hooks/useGetSingleListingDetails";
import { useGetNFTMetaDataFromIPFSURI } from "@/hooks/useGetNFTMetaDataFromIPFSURI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import {
  Loader2,
  AlertCircle,
  ExternalLink,
  Copy,
  Heart,
  Share2,
  Eye,
  Calendar,
  User,
  Zap,
  Info,
  Globe,
  Image as ImageIcon,
} from "lucide-react";
import { formatListedDate } from "@/lib/date-utils";
import { BuyNFT } from "./_components/BuyNFT";
import { CancelNFTListing } from "./_components/CancelNFTListing";

export default function ListedNFTFullDetailsPage() {
  const params = useParams<{ listingID: string }>();
  const { getIPFSMetadata, metadata, loading } = useGetNFTMetaDataFromIPFSURI();
  const account = useAccount();
  const [imageError, setImageError] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  // Parse listingID - always call hooks first
  const listingID = params?.listingID ? Number(params.listingID) : 0;
  const isValidListingID = !isNaN(listingID) && listingID > 0;

  // Always call all hooks at the top level
  const {
    singleListing,
    isSingleListingLoading,
    isSingleListingError,
    singleListingError,
  } = useGetSingleListingDetails(isValidListingID ? listingID : 0);

  // Fetch metadata from IPFS
  React.useEffect(() => {
    if (singleListing?.tokenURI) {
      void getIPFSMetadata(singleListing.tokenURI);
    }
  }, [singleListing?.tokenURI, getIPFSMetadata]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Handle validation errors after all hooks are called
  if (!params?.listingID || !isValidListingID) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl">
          <Card className="mx-auto max-w-md border-red-200 dark:border-red-800">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100">
                  Invalid Listing ID
                </h3>
                <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                  The listing ID provided is not valid.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSingleListingLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl">
          <Card className="mx-auto max-w-md">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Loading NFT Details
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Fetching listing information from the blockchain...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSingleListingError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl">
          <Card className="mx-auto max-w-md border-red-200 dark:border-red-800">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100">
                  Failed to Load NFT
                </h3>
                <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                  {singleListingError?.message ??
                    "Unable to fetch listing details. Please try again later."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!singleListing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl">
          <Card className="mx-auto max-w-md">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                <Eye className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  NFT Not Found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  No listing found for ID {listingID}.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isOwner =
    account.address?.toLowerCase() === singleListing.seller.toLowerCase();
  const isSold = !singleListing.active;
  const priceInEth = formatEther(singleListing.price);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/20">
              <Eye className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              NFT Details
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Listing #{singleListing.listingId.toString()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                    </div>
                  ) : metadata?.image && !imageError ? (
                    <img
                      src={metadata.fallbackImage ?? metadata.image}
                      alt={metadata.name ?? `NFT #${singleListing.tokenId}`}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {metadata?.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    {metadata.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Attributes */}
            {metadata?.attributes && metadata.attributes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Attributes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {metadata.attributes.map((attr, index) => (
                      <div
                        key={index}
                        className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                      >
                        <p className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          {attr.trait_type}
                        </p>
                        <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                          {attr.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title and Status */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {metadata?.name ?? `NFT #${singleListing.tokenId}`}
                    </h2>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={isSold ? "secondary" : "default"}
                        className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                      >
                        {isSold ? "Sold" : "Available"}
                      </Badge>
                      {isOwner && <Badge variant="outline">Your Listing</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void copyToClipboard(window.location.href)}
                    >
                      {copied ? (
                        <span className="text-xs">Copied!</span>
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50 p-4 dark:from-emerald-900/20 dark:to-blue-900/20">
                  <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                    Current Price
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {priceInEth}
                    </span>
                    <span className="text-xl text-gray-600 dark:text-gray-400">
                      ETH
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {!isSold && account.isConnected && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/10">
                      <BuyNFT />
                    </div>
                  )}

                  {!isSold && isOwner && account.isConnected && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/10">
                      <CancelNFTListing />
                    </div>
                  )}

                  {!account.isConnected && (
                    <Button className="w-full" variant="outline">
                      Connect Wallet to Purchase
                    </Button>
                  )}

                  {isSold && (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-800">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        This NFT has been sold
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Listing Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Listing Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Token ID
                  </span>
                  <span className="font-semibold">
                    #{singleListing.tokenId.toString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Contract Address
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {formatAddress(singleListing.nftContract)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        void copyToClipboard(singleListing.nftContract)
                      }
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Seller
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {formatAddress(singleListing.seller)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => void copyToClipboard(singleListing.seller)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {isSold && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Buyer
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {formatAddress(singleListing.buyer)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          void copyToClipboard(singleListing.buyer)
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Listed Date
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {formatListedDate(Number(singleListing.listedAt))}
                    </span>
                  </div>
                </div>

                {metadata?.external_link && (
                  <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={metadata.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        View External Link
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity/History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 py-2 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Listed</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatListedDate(Number(singleListing.listedAt))}
                    </span>
                  </div>

                  {isSold && (
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Sold</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {priceInEth} ETH
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
