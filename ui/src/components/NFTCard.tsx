"use client";

import React from "react";
import type { ListingWithTokenURIType } from "@/types";
import { formatEther } from "viem";
import { useGetNFTMetaDataFromIPFSURI } from "@/hooks/useGetNFTMetaDataFromIPFSURI";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatDateWithRelative } from "@/lib/date-utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Eye,
  Loader2,
  Image as ImageIcon,
  Coins,
} from "lucide-react";

export const NFTCard = ({
  listingId,
  tokenId,
  active,
  listedAt,
  price,
  tokenURI,
}: ListingWithTokenURIType) => {
  const { getIPFSMetadata, loading, metadata } = useGetNFTMetaDataFromIPFSURI();
  const dateInfo = formatDateWithRelative(listedAt);

  React.useEffect(() => {
    const fetchData = async () => {
      if (tokenURI) {
        await getIPFSMetadata(tokenURI);
      }
    };
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenURI]);

  return (
    <Card className="group overflow-hidden border-2 border-gray-200 bg-white transition-all duration-300 hover:border-emerald-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-emerald-600">
      {/* Image Section */}
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Loading artwork...
                </p>
              </div>
            </div>
          ) : metadata ? (
            <>
              <img
                src={metadata.image}
                alt={metadata.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              <div className="absolute top-3 right-3">
                <Badge
                  variant={active ? "success" : "secondary"}
                  className="shadow-md"
                >
                  {active ? "Active" : "Sold"}
                </Badge>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <ImageIcon className="h-12 w-12" />
                <p className="text-sm">No image available</p>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* NFT Title */}
          <div>
            <h3 className="line-clamp-2 text-lg leading-tight font-bold text-gray-900 dark:text-white">
              {metadata?.name ?? `NFT #${tokenId}`}
            </h3>
            {metadata?.description && (
              <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {metadata.description}
              </p>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-emerald-600" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {formatEther(price)} ETH
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              ID #{listingId}
            </Badge>
          </div>

          {/* Date and Token Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              <span title={dateInfo.formatted}>{dateInfo.relative}</span>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Token #{tokenId}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="p-4 pt-0">
        <Link href={`/my-art/${listingId}`} className="w-full">
          <Button
            variant="outline"
            className="w-full transition-all duration-200 group-hover:border-emerald-300 group-hover:bg-emerald-50 group-hover:text-emerald-700 dark:group-hover:border-emerald-600 dark:group-hover:bg-emerald-900/20 dark:group-hover:text-emerald-300"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
