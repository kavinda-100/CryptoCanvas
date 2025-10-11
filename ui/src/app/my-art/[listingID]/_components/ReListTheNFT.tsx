"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Loader2, AlertCircle } from "lucide-react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS } from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";

export const ReListTheNFT = ({ listingId }: { listingId: bigint }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [relistError, setReListError] = React.useState<string | null>(null);
  const [newPrice, setNewPrice] = React.useState<string>("");
  const { data: hash, writeContract } = useWriteContract();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Wait for transaction confirmation
  const {
    isSuccess: isConfirmed,
    error,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle transaction errors
  React.useEffect(() => {
    if (isError && error) {
      console.error("Error during NFT Re-listing:", error);
      setIsLoading(false);

      // Check for nonce-related errors
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("nonce") || errorMessage.includes("Nonce")) {
        setReListError(
          "Transaction nonce error. Please refresh the page and try again, or reset your wallet.",
        );
        toast.error("Nonce error detected. Please refresh and try again.", {
          action: {
            label: "Refresh Now",
            onClick: () => window.location.reload(),
          },
        });
      } else if (
        errorMessage.includes("rejected") ||
        errorMessage.includes("denied")
      ) {
        setReListError("Transaction was rejected by user.");
        toast.error("Transaction rejected.");
      } else {
        setReListError(
          error instanceof Error
            ? error.message
            : "An Error occurred during Re-listing.",
        );
        toast.error("Failed to submit re-listing transaction.");
      }
    }
  }, [isError, error]);

  // Handle transaction confirmation
  React.useEffect(() => {
    if (isConfirmed && hash) {
      console.log("NFT Re-listing confirmed:", hash);
      setIsLoading(false);
      setReListError(null);
      toast.success("NFT Re-listed successfully! 💰");

      // Invalidate all relevant queries after confirmation
      const refreshData = async () => {
        // Invalidate all readContract queries (covers all our hooks)
        await queryClient.invalidateQueries({
          queryKey: ["readContract"],
        });

        // Force refetch all active queries
        await queryClient.refetchQueries({
          type: "active",
        });

        // Also specifically invalidate by contract address if we have it
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

      // Wait a bit longer for data to be indexed
      setTimeout(() => {
        router.push("/my-art");
      }, 5000); // Increased to 5 seconds
    }
  }, [isConfirmed, hash, queryClient, router]);

  const handleReListNFT = async () => {
    // Validate price input
    if (!newPrice || parseFloat(newPrice) <= 0) {
      toast.warning("Please enter a valid price greater than 0.");
      return;
    }

    setIsLoading(true);
    setReListError(null);

    try {
      writeContract({
        address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
        abi: cryptoCanvasMarketplaceABI.abi,
        functionName: "relistPurchasedNFT",
        args: [listingId, parseEther(newPrice)],
      });
    } catch (error) {
      console.error("Error during NFT Re-listing:", error);
      setIsLoading(false);
      setReListError(
        error instanceof Error
          ? error.message
          : "An Error occurred during Re-listing.",
      );
      toast.error("Failed to submit re-listing transaction.");
    }
  };

  if (showConfirm) {
    return (
      <div className="space-y-4">
        <div className="mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Re-list Your NFT
          </span>
        </div>
        <p className="mb-3 text-sm text-pretty text-gray-600 dark:text-gray-400">
          You can re-list this NFT with a new price. This will create a new
          listing on the marketplace.
        </p>
        {/* Price input */}
        <div className="space-y-2">
          <Label htmlFor="newPrice">New Price (in ETH)</Label>
          <Input
            id="newPrice"
            type="number"
            step="0.001"
            min="0"
            placeholder="0.001"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleReListNFT}
            disabled={isLoading || !!hash}
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLoading && !hash ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : hash && !isConfirmed ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                Yes, Re-list
              </>
            )}
          </Button>
          <Button
            onClick={() => setShowConfirm(false)}
            variant="outline"
            className="flex-1"
            disabled={isLoading || !!hash}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={() => setShowConfirm(true)}
        className="w-full bg-blue-600 font-semibold text-white hover:bg-blue-700"
        size="lg"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Re-list NFT
      </Button>
      <p className="text-center text-xs text-blue-600 dark:text-blue-400">
        Create a new listing for this NFT on the marketplace
      </p>
      {relistError && (
        <div className="mt-2 rounded border border-red-400 bg-red-50 px-4 py-2">
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            {relistError}
          </p>
          {relistError.includes("nonce") && (
            <div className="mt-3 space-y-2">
              <p className="text-center text-xs text-red-500">
                Wallet nonce is out of sync with blockchain.
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  🔄 Refresh Page
                </Button>
                <Button
                  onClick={() => {
                    toast.info(
                      "Open MetaMask → Settings → Advanced → Reset Account",
                    );
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  ⚙️ Reset Guide
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
