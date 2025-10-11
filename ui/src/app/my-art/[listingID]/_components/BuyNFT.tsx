"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useWriteContract } from "wagmi";
import { CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS } from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const BuyNFT = ({
  listingId,
  price,
}: {
  listingId: bigint;
  price: bigint;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [purchaseError, setPurchaseError] = React.useState<string | null>(null);
  const { data: hash, writeContract } = useWriteContract();
  const router = useRouter();

  const handleBuyNFT = async () => {
    setIsLoading(true);
    writeContract(
      {
        address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
        abi: cryptoCanvasMarketplaceABI.abi,
        functionName: "buyNFT",
        args: [listingId],
        value: price,
      },
      {
        onSuccess() {
          console.log("NFT purchase successful:", hash);
          setIsLoading(false);
          setPurchaseError(null);
          toast.success("NFT purchased successfully! 💰");
          // wait for a few seconds
          setTimeout(() => {
            router.push("/my-art");
          }, 3000);
        },
        onError(error) {
          console.error("Error during NFT purchase:", error);
          setIsLoading(false);
          setPurchaseError(
            error.message ?? "An Error occurred during purchase.",
          );
        },
      },
    );
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
      {purchaseError && (
        <div className="mt-2 rounded border border-red-400 bg-red-50 px-4 py-2">
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            {purchaseError}
          </p>
        </div>
      )}
    </div>
  );
};
