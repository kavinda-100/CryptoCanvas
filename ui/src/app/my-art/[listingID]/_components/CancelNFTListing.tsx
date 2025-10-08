"use client";

import { Button } from "@/components/ui/button";
import { X, Loader2, AlertTriangle } from "lucide-react";
import React from "react";

export const CancelNFTListing = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleCancelListing = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement cancel listing logic here
      console.log("Canceling NFT listing...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate transaction
      setShowConfirm(false);
    } catch (error) {
      console.error("Error canceling listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="space-y-3">
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Confirm Cancellation
          </span>
        </div>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to cancel this listing? This action cannot be
          undone.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={handleCancelListing}
            disabled={isLoading}
            variant="destructive"
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Canceling...
              </>
            ) : (
              <>
                <X className="mr-2 h-4 w-4" />
                Yes, Cancel
              </>
            )}
          </Button>
          <Button
            onClick={() => setShowConfirm(false)}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
          >
            Keep Listed
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={() => setShowConfirm(true)}
        variant="destructive"
        className="w-full font-semibold"
        size="lg"
      >
        <X className="mr-2 h-4 w-4" />
        Cancel Listing
      </Button>
      <p className="text-center text-xs text-red-600 dark:text-red-400">
        Remove your NFT from the marketplace
      </p>
    </div>
  );
};
