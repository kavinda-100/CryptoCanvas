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
import {
  CRYPTO_CANVAS_NFT_ADDRESS,
  CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS,
} from "@/abi";
import cryptoCanvasNFTsABI from "@/abi/json/CryptoCanvasNFT.json";
import { toast } from "sonner";
import {
  Loader2Icon,
  Shield,
  CheckCircle,
  AlertTriangle,
  Lock,
  Unlock,
} from "lucide-react";

type ApproveNFTProps = {
  setSteps: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
};

export const ApproveNFT = ({ setSteps }: ApproveNFTProps) => {
  // Get the NFT details from the store
  const { NFTId } = useCreateNFTStoreDetails();
  const [isApproving, setIsApproving] = React.useState(false);
  const { data: hash, writeContract } = useWriteContract();

  const approveNFT = () => {
    // Check if NFTId is valid
    if (!NFTId) {
      toast.warning("Invalid NFT ID.");
      return;
    }
    // Set loading state
    setIsApproving(true);
    writeContract(
      {
        address: CRYPTO_CANVAS_NFT_ADDRESS as `0x${string}`,
        abi: cryptoCanvasNFTsABI.abi,
        functionName: "approve",
        args: [
          CRYPTO_CANVAS_NFT_MARKETPLACE_ADDRESS as `0x${string}`,
          BigInt(NFTId),
        ],
      },
      {
        onSuccess() {
          toast.success("NFT approved successfully!");
          setSteps(3); // Move to the next step
        },
        onError(error) {
          console.error("Error approving NFT:", error);
          toast.error("Error Approving NFT. Please try again.");
        },
      },
    );
    setIsApproving(false);
  };

  return (
    <section className="w-full">
      <Card className="border-2 border-emerald-200/50 bg-gradient-to-br from-white via-emerald-50/30 to-green-50/30 shadow-xl dark:border-gray-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 text-white">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="rounded-lg bg-white/20 p-2">
              <Shield className="h-6 w-6" />
            </div>
            Approve NFT #{NFTId}
          </CardTitle>
          <CardDescription className="text-emerald-100">
            Grant marketplace permission to manage your NFT for listing and
            trading.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Info Cards */}
            <div className="grid gap-4">
              <div className="flex items-start gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-800">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-blue-900 dark:text-blue-100">
                    Current Status
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Your NFT is currently locked and cannot be traded on the
                    marketplace.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-800">
                  <Unlock className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-green-900 dark:text-green-100">
                    After Approval
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    The marketplace will be able to transfer your NFT when
                    someone purchases it.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-800">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-amber-900 dark:text-amber-100">
                    Security Note
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    You maintain full ownership. You can revoke this approval at
                    any time.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Steps */}
            <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <CheckCircle className="h-5 w-5 text-green-600" />
                What happens when you approve:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Grants marketplace smart contract permission to transfer your
                  NFT
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Enables automatic transfer when someone purchases your NFT
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Ensures secure and instant transactions
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  You retain full ownership until a sale occurs
                </li>
              </ul>
            </div>

            {/* Transaction Hash Display */}
            {hash && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
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
              onClick={approveNFT}
              disabled={isApproving}
              className="rounded-lg bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 hover:shadow-xl disabled:opacity-50"
            >
              {isApproving ? (
                <div className="flex items-center gap-3">
                  <Loader2Icon className="h-5 w-5 animate-spin" />
                  <span>Approving NFT...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  <span>Approve NFT</span>
                </div>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};
