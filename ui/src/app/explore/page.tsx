"use client";

import React from "react";
import { NFTCard } from "@/components/NFTCard";
import { useGetAllNFTs } from "@/hooks/useGetAllNFTs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Loader2,
  Compass,
  TrendingUp,
  Grid3X3,
  List,
  SortAsc,
  Eye,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatEther } from "viem";

type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "listing-id";
type ViewMode = "grid" | "list";

const AllNFTsPage = () => {
  const {
    allActiveNFTs,
    isAllActiveNFTsPending,
    isAllActiveNFTsError,
    allActiveNFTsError,
  } = useGetAllNFTs();

  // Local state for UI controls
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<SortOption>("newest");
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [priceFilter, setPriceFilter] = React.useState<string>("all");

  // Filter and sort NFTs
  const filteredAndSortedNFTs = React.useMemo(() => {
    if (!allActiveNFTs) return [];

    let filtered = [...allActiveNFTs];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((nft) => {
        const query = searchQuery.toLowerCase();
        return (
          nft.listingId.toString().includes(query) ||
          nft.tokenId.toString().includes(query) ||
          nft.seller.toLowerCase().includes(query)
        );
      });
    }

    // Apply price filter
    if (priceFilter !== "all") {
      const priceRanges = {
        "under-0.01": { min: 0, max: 0.01 },
        "0.01-0.1": { min: 0.01, max: 0.1 },
        "0.1-1": { min: 0.1, max: 1 },
        "above-1": { min: 1, max: Infinity },
      };

      if (priceFilter in priceRanges) {
        const range = priceRanges[priceFilter as keyof typeof priceRanges];
        filtered = filtered.filter((nft) => {
          const priceInEth = parseFloat(formatEther(nft.price));
          return priceInEth >= range.min && priceInEth < range.max;
        });
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return Number(b.listedAt) - Number(a.listedAt);
        case "oldest":
          return Number(a.listedAt) - Number(b.listedAt);
        case "price-low":
          return Number(a.price) - Number(b.price);
        case "price-high":
          return Number(b.price) - Number(a.price);
        case "listing-id":
          return Number(a.listingId) - Number(b.listingId);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allActiveNFTs, searchQuery, sortBy, priceFilter]);

  const statsData = React.useMemo(() => {
    if (!allActiveNFTs) return { total: 0, totalValue: "0", avgPrice: "0" };

    const totalValue = allActiveNFTs.reduce(
      (sum, nft) => sum + Number(nft.price),
      0,
    );
    const avgPrice =
      allActiveNFTs.length > 0 ? totalValue / allActiveNFTs.length : 0;

    return {
      total: allActiveNFTs.length,
      totalValue: formatEther(BigInt(totalValue)),
      avgPrice: formatEther(BigInt(Math.floor(avgPrice))),
    };
  }, [allActiveNFTs]);

  if (isAllActiveNFTsPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl">
          <Card className="mx-auto max-w-md">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Discovering NFTs
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Fetching the latest artworks from the blockchain...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isAllActiveNFTsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl">
          <Card className="mx-auto max-w-md border-red-200 dark:border-red-800">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                <Compass className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100">
                  Failed to Load NFTs
                </h3>
                <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                  {allActiveNFTsError?.message ??
                    "Unable to fetch NFTs. Please try again later."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!allActiveNFTs || allActiveNFTs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="mx-auto max-w-7xl">
          <Card className="mx-auto max-w-md">
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
              <div className="rounded-full bg-blue-100 p-4 dark:bg-blue-900/20">
                <Sparkles className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  No NFTs Available
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Be the first to create and list an NFT on CryptoCanvas!
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Sparkles className="mr-2 h-4 w-4" />
                Create First NFT
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        {/* Page Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
              <Compass className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Explore NFTs
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover unique digital artworks from talented creators around the
            world
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border border-gray-200 bg-white/70 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/70">
            <CardContent className="p-6 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {statsData.total}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total NFTs Listed
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white/70 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/70">
            <CardContent className="p-6 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {statsData.totalValue.slice(0, 6)} ETH
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Market Value
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white/70 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/70">
            <CardContent className="p-6 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <ArrowUpDown className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {statsData.avgPrice.slice(0, 6)} ETH
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Average Price
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border border-gray-200 bg-white/70 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/70">
          <CardContent className="p-6">
            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search by listing ID, token ID, or seller address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white pl-10 dark:bg-gray-800"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Price Filter */}
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-40 bg-white dark:bg-gray-800">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-0.01">Under 0.01 ETH</SelectItem>
                    <SelectItem value="0.01-0.1">0.01 - 0.1 ETH</SelectItem>
                    <SelectItem value="0.1-1">0.1 - 1 ETH</SelectItem>
                    <SelectItem value="above-1">Above 1 ETH</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select
                  value={sortBy}
                  onValueChange={(value: string) =>
                    setSortBy(value as SortOption)
                  }
                >
                  <SelectTrigger className="w-40 bg-white dark:bg-gray-800">
                    <SortAsc className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="listing-id">Listing ID</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="gap-2">
                  Search: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {priceFilter !== "all" && (
                <Badge variant="secondary" className="gap-2">
                  Price: {priceFilter}
                  <button
                    onClick={() => setPriceFilter("all")}
                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {filteredAndSortedNFTs.length} NFT
              {filteredAndSortedNFTs.length === 1 ? "" : "s"} Found
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {searchQuery || priceFilter !== "all"
                ? `Filtered from ${allActiveNFTs.length} total NFTs`
                : "Showing all available NFTs"}
            </p>
          </div>
        </div>

        {/* NFT Grid/List */}
        {filteredAndSortedNFTs.length === 0 ? (
          <Card className="mx-auto max-w-md">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                <Eye className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  No NFTs Match Your Filters
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search criteria to see more results.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-4"
            }
          >
            {filteredAndSortedNFTs.map((nft) => (
              <div
                key={nft.listingId.toString()}
                className="transform transition-all duration-200 hover:scale-[1.02]"
              >
                <NFTCard {...nft} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNFTsPage;
