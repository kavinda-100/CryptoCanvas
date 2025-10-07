"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateNFTStoreDetails } from "@/store/createNFTStore";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import {
  CRYPTO_CANVAS_NFT_ADDRESS,
  CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS,
} from "@/abi";
import cryptoCanvasMarketplaceABI from "@/abi/json/MarketPlace.json";
import { toast } from "sonner";
import {
  Loader2Icon,
  Store,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const ListNFTs = () => {
  // Get the NFT details from the store
  const { NFTId } = useCreateNFTStoreDetails();
  const [isListing, setIsListing] = React.useState(false);
  const [nftPrice, setNftPrice] = React.useState<string>("");
  const { data: hash, writeContract } = useWriteContract();

  const listNewNFT = () => {
    // Check if NFTId is valid
    if (!NFTId) {
      toast.warning("Invalid NFT ID.");
      return;
    }

    // Validate price input
    if (!nftPrice || parseFloat(nftPrice) <= 0) {
      toast.warning("Please enter a valid price greater than 0.");
      return;
    }

    // Set loading state
    setIsListing(true);
    writeContract(
      {
        address: CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
        abi: cryptoCanvasMarketplaceABI.abi,
        functionName: "listNFT",
        args: [
          CRYPTO_CANVAS_NFT_ADDRESS as `0x${string}`,
          BigInt(NFTId),
          parseEther(nftPrice),
        ],
      },
      {
        onSuccess() {
          toast.success("NFT listed successfully!");
          // Move to the my-art page or another appropriate action later
        },
        onError(error) {
          console.error("Error listing NFT:", error);
          toast.error("Error Listing NFT. Please try again.");
        },
      },
    );
    setIsListing(false);
  };

  return (
    <section className="w-full">
      <Card className="border-2 border-emerald-200/50 bg-gradient-to-br from-white via-emerald-50/30 to-green-50/30 shadow-xl dark:border-gray-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 text-white">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="rounded-lg bg-white/20 p-2">
              <Store className="h-6 w-6" />
            </div>
            List NFT #{NFTId} for Sale
          </CardTitle>
          <CardDescription className="text-emerald-100">
            Set your price and make your NFT available for purchase on the
            CryptoCanvas marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Critical Notice */}
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600 dark:text-red-400" />
                <div>
                  <h4 className="mb-2 text-lg font-bold text-red-900 dark:text-red-100">
                    ⚠️ IMPORTANT: Complete NFT Creation
                  </h4>
                  <div className="space-y-2 text-sm text-red-800 dark:text-red-200">
                    <p className="font-semibold">
                      You MUST list your NFT to complete the creation process!
                    </p>
                    <ul className="ml-4 space-y-1">
                      <li>
                        • If you don&apos;t list the NFT, it will be lost
                        forever
                      </li>
                      <li>
                        • Our platform tracks NFTs through the marketplace
                        contract
                      </li>
                      <li>• Unlisted NFTs cannot be discovered or traded</li>
                      <li>
                        • This step finalizes your NFT&apos;s existence on our
                        platform
                      </li>
                    </ul>
                    <p className="mt-3 font-semibold text-red-900 dark:text-red-100">
                      💡 Don&apos;t worry: You can cancel the listing later if
                      needed!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-800">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-green-900 dark:text-green-100">
                    Marketplace Visibility
                  </h4>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Your NFT will be discoverable by collectors worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-800">
                  <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-blue-900 dark:text-blue-100">
                    Instant Trading
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Buyers can purchase immediately with secure transactions.
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div>
                  <h4 className="mb-2 font-semibold text-amber-900 dark:text-amber-100">
                    Important Information
                  </h4>
                  <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                    <li>
                      • Once listed, your NFT will be publicly available for
                      purchase
                    </li>
                    <li>
                      • You can cancel the listing anytime before someone buys
                      it
                    </li>
                    <li>
                      • Platform commission fees apply to successful sales
                    </li>
                    <li>• Payments are processed instantly upon purchase</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Price Setting Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900">
                  <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <Label
                  htmlFor="nftPrice"
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  Set Your Price
                </Label>
              </div>

              <div className="space-y-4">
                <Input
                  id="nftPrice"
                  type="number"
                  step="0.001"
                  min="0"
                  value={nftPrice}
                  onChange={(e) => setNftPrice(e.target.value)}
                  placeholder="0.001"
                  className="border-2 border-gray-300 bg-gray-50 text-lg font-semibold transition-colors focus:border-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-emerald-400"
                />

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                  <p className="mb-3 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                    <TrendingUp className="h-4 w-4" />
                    💡 Pricing Guide
                  </p>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between rounded bg-white p-2 dark:bg-gray-700">
                      <span className="font-mono text-blue-600 dark:text-blue-400">
                        0.001 ETH
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ≈ $2-4 USD (Starter NFT)
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-white p-2 dark:bg-gray-700">
                      <span className="font-mono text-purple-600 dark:text-purple-400">
                        0.01 ETH
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ≈ $20-40 USD (Quality Art)
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-white p-2 dark:bg-gray-700">
                      <span className="font-mono text-green-600 dark:text-green-400">
                        0.1 ETH
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        ≈ $200-400 USD (Premium NFT)
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                    💡 Choose a competitive price based on your artwork&apos;s
                    uniqueness and quality
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Hash Display */}
            {hash && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-900 dark:text-blue-100">
                  <CheckCircle className="h-5 w-5" />
                  Transaction Submitted
                </h4>
                <p className="rounded bg-white p-2 font-mono text-xs break-all text-blue-700 dark:bg-gray-800 dark:text-blue-300">
                  {hash}
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="rounded-b-lg bg-gray-50 p-6 dark:bg-gray-800/50">
          <div className="flex w-full justify-end">
            <Button
              onClick={listNewNFT}
              disabled={isListing || !nftPrice || parseFloat(nftPrice) <= 0}
              className="rounded-lg bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 hover:shadow-xl disabled:opacity-50"
            >
              {isListing ? (
                <div className="flex items-center gap-3">
                  <Loader2Icon className="h-5 w-5 animate-spin" />
                  <span>Listing NFT...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5" />
                  <span>List NFT for Sale</span>
                </div>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
