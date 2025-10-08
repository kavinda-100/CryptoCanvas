"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import React from "react";

export const BuyNFT = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleBuyNFT = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement buy NFT logic here
      console.log("Buying NFT...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate transaction
    } catch (error) {
      console.error("Error buying NFT:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="mb-2 flex items-center gap-2">
        <ShoppingCart className="h-4 w-4 text-emerald-600" />
        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
          Purchase NFT
        </span>
      </div>
      <Button
        onClick={handleBuyNFT}
        disabled={isLoading}
        className="w-full bg-emerald-600 py-3 text-lg font-semibold text-white hover:bg-emerald-700"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Buy Now
          </>
        )}
      </Button>
      <p className="text-center text-xs text-emerald-600 dark:text-emerald-400">
        Complete your purchase securely on the blockchain
      </p>
    </div>
  );
};
