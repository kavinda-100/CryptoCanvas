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
import { Loader2Icon } from "lucide-react";

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
      <Card>
        <CardHeader>
          <CardTitle>Approve NFT {NFTId}</CardTitle>
          <CardDescription>
            By approving this NFT, you are allowing it to be used in the
            CryptoCanvas platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <p>
            Once approved, this NFT will be available for use in the platform.
          </p>
          <p>Otherwise it will remain locked and inaccessible.</p>

          {hash && <p className="break-all">Transaction Hash: {hash}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={approveNFT} disabled={isApproving}>
            {isApproving ? (
              <div className="flex gap-2">
                <Loader2Icon className="size-5 animate-spin" /> Approving...
              </div>
            ) : (
              "Approve NFT"
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
