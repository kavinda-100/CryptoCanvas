import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveNFTs } from "./_tabs/ActiveNFTs";
import { InActiveNFTs } from "./_tabs/InActiveNFTs";
import { Palette, TrendingUp, CheckCircle, ShoppingBag } from "lucide-react";
import { UserPurchasedNFTs } from "./_tabs/UserPurchasedNFTs";

const MyArtPage = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto space-y-8">
        {/* Page Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/20">
              <Palette className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Art Collection
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Manage your NFT portfolio, track your active listings, view your
            inactive listings, and see your purchased NFTs
          </p>
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="activeNFTs" className="w-full">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <TabsTrigger
                value="activeNFTs"
                className="flex items-center gap-2 transition-all duration-200 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4" />
                Active Listings
              </TabsTrigger>
              <TabsTrigger
                value="inActiveNFTs"
                className="flex items-center gap-2 transition-all duration-200 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                <CheckCircle className="h-4 w-4" />
                Inactive NFTs
              </TabsTrigger>
              <TabsTrigger
                value="userPurchasedNFTs"
                className="flex items-center gap-2 transition-all duration-200 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              >
                <ShoppingBag className="h-4 w-4" />
                Purchased NFTs
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-8">
            <TabsContent
              value="activeNFTs"
              className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <ActiveNFTs />
            </TabsContent>
            <TabsContent
              value="inActiveNFTs"
              className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <InActiveNFTs />
            </TabsContent>
            <TabsContent
              value="userPurchasedNFTs"
              className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <UserPurchasedNFTs />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default MyArtPage;
