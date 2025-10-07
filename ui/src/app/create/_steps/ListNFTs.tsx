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
import { Loader2Icon } from "lucide-react";
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
      <Card>
        <CardHeader>
          <CardTitle>List The NFT {NFTId}</CardTitle>
          <CardDescription>
            By listing this NFT, you are making it available for sale on the
            CryptoCanvas platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <p>
            Once listed, this NFT will be available for sale on the platform.
          </p>
          <p>Otherwise it will remain locked and inaccessible.</p>
          <p>
            Once listed, you will be able to view and manage this NFT in your
            inventory.
          </p>
          <p>
            You can later cancel the listing of this NFT if you change your
            mind.
          </p>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="nftPrice">Set Price (in ETH)</Label>
            <Input
              id="nftPrice"
              type="number"
              step="0.001"
              min="0"
              value={nftPrice}
              onChange={(e) => setNftPrice(e.target.value)}
              placeholder="0.001"
            />
            <div className="text-muted-foreground space-y-1 text-xs">
              <p className="font-medium">💡 Price Examples:</p>
              <p>
                • <span className="font-mono">0.001</span> = 0.001 ETH (~$2-4
                USD)
              </p>
              <p>
                • <span className="font-mono">0.01</span> = 0.01 ETH (~$20-40
                USD)
              </p>
              <p>
                • <span className="font-mono">0.1</span> = 0.1 ETH (~$200-400
                USD)
              </p>
              <p className="text-blue-600 dark:text-blue-400">
                Enter the amount in ETH format (e.g., 0.001 for a small NFT)
              </p>
            </div>
          </div>

          {hash && <p className="break-all">Transaction Hash: {hash}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={listNewNFT} disabled={isListing}>
            {isListing ? (
              <div className="flex gap-2">
                <Loader2Icon className="size-5 animate-spin" /> Listing...
              </div>
            ) : (
              "List NFT"
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
