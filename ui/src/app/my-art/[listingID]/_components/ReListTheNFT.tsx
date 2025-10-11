"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Loader2, AlertCircle } from "lucide-react";
import { useWriteContract } from "wagmi";
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

  const handleReListNFT = async () => {
    // Validate price input
    if (!newPrice || parseFloat(newPrice) <= 0) {
      toast.warning("Please enter a valid price greater than 0.");
      return;
    }

    setIsLoading(true);
    writeContract(
      {
        address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
        abi: cryptoCanvasMarketplaceABI.abi,
        functionName: "relistPurchasedNFT",
        args: [listingId, parseEther(newPrice)],
      },
      {
        onSuccess() {
          console.log("NFT Re-listing successfully:", hash);
          setIsLoading(false);
          setReListError(null);
          toast.success("NFT Re-listed successfully! 💰");

          // Invalidate all relevant queries
          void queryClient.invalidateQueries({
            queryKey: ["readContract"],
          });

          // Also specifically invalidate wagmi queries
          void queryClient.refetchQueries({
            type: "active",
          });

          // wait for a few seconds to allow queries to refresh
          setTimeout(() => {
            router.push("/my-art");
          }, 2000);
        },
        onError(error) {
          console.error("Error during NFT Re-listing:", error);
          setIsLoading(false);
          setReListError(
            error.message ?? "An Error occurred during Re-listing.",
          );
        },
      },
    );
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
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
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
            disabled={isLoading}
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
        </div>
      )}
    </div>
  );
};
