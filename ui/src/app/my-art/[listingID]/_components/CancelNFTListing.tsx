"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2, AlertTriangle } from "lucide-react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS } from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const CancelNFTListing = ({ listingId }: { listingId: bigint }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [cancelError, setCancelError] = React.useState<string | null>(null);
  const { data: hash, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const router = useRouter();
  const queryClient = useQueryClient();

  const handleCancelListing = async () => {
    setIsLoading(true);
    setCancelError(null);

    writeContract({
      address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
      abi: cryptoCanvasMarketplaceABI.abi,
      functionName: "cancelListing",
      args: [listingId],
    });
  };

  React.useEffect(() => {
    if (isConfirmed) {
      // Transaction confirmed on blockchain
      console.log("NFT listing canceled successfully:", hash);
      toast.success("NFT listing canceled successfully! 🗑️");
      setIsLoading(false);

      // Enhanced query invalidation with multiple attempts
      const refreshData = async () => {
        // Invalidate all readContract queries (covers all our hooks)
        await queryClient.invalidateQueries({
          queryKey: ["readContract"],
        });

        // Force refetch all active queries
        await queryClient.refetchQueries({
          type: "active",
        });

        // Also specifically invalidate by contract address
        if (CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS) {
          await queryClient.invalidateQueries({
            predicate: (query) => {
              return query.queryKey.includes(
                CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS,
              );
            },
          });
        }

        // Try again after 2 seconds for good measure
        setTimeout(() => {
          void queryClient.invalidateQueries({
            queryKey: ["readContract"],
          });
        }, 2000);
      };

      void refreshData();

      // Wait for blockchain indexing before navigation
      setTimeout(() => {
        router.push("/my-art");
      }, 5000);
    }
  }, [isConfirmed, hash, queryClient, router]);

  if (showConfirm) {
    return (
      <div className="space-y-3">
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Confirm Cancellation
          </span>
        </div>
        <p className="mb-3 text-sm text-pretty text-gray-600 dark:text-gray-400">
          Are you sure you want to cancel this listing? Even though you will,
          you can relist this NFT later 😊.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={handleCancelListing}
            disabled={isLoading || isConfirming}
            variant="destructive"
            className="flex-1"
          >
            {isLoading || isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isLoading && !isConfirming ? "Submitting..." : "Confirming..."}
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
            disabled={isLoading || isConfirming}
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
        Remove your NFT from the marketplace listing.
      </p>
      {cancelError && (
        <div className="mt-2 rounded border border-red-400 bg-red-50 px-4 py-2">
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            {cancelError}
          </p>
        </div>
      )}
    </div>
  );
};
