"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dropzone from "../_components/Dropzone";
import { useCreateNFTStoreDetails } from "@/store/createNFTStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Loader2Icon,
  Plus,
  X,
  Sparkles,
  Palette,
  FileImage,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { uploadJSONMetadata } from "../_actions";
import { CRYPTO_CANVAS_NFT_ADDRESS } from "@/abi";
import cryptoCanvasNFTsABI from "@/abi/json/CryptoCanvasNFT.json";
import { decodeEventLog } from "viem";

type CreateNFTProps = {
  setSteps: React.Dispatch<React.SetStateAction<1 | 2 | 3>>;
};

export const CreateNFT = ({ setSteps }: CreateNFTProps) => {
  // Get the NFT details from the store
  const {
    name,
    description,
    attributes,
    external_link,
    setName,
    setDescription,
    setAttributes,
    setExternalLink,
    setNFTId,
    getFullNFTDetails,
  } = useCreateNFTStoreDetails();
  const [isMinting, setIsMinting] = React.useState(false);
  const { data: hash, writeContract } = useWriteContract();

  // Wait for transaction receipt to get the NFT ID
  const { data: receipt } = useWaitForTransactionReceipt({
    hash,
  });

  // ----------------------------------------- Mint -----------------------------------------
  // Effect to handle successful minting and extract NFT ID
  React.useEffect(() => {
    if (receipt && receipt.logs.length > 0) {
      try {
        // Look for NFTMinted event which contains the token ID directly
        for (const log of receipt.logs) {
          try {
            const decodedLog = decodeEventLog({
              abi: cryptoCanvasNFTsABI.abi,
              data: log.data,
              topics: log.topics,
            });

            // Check if this is the NFTMinted event
            if (decodedLog.eventName === "NFTMinted") {
              const args = decodedLog.args as unknown as {
                creator: string;
                tokenId: bigint;
                tokenURI: string;
              };

              const nftId = Number(args.tokenId);
              setNFTId(nftId);
              toast.dismiss(); // Dismiss the loading toast
              toast.success(`NFT minted successfully! Token ID: ${nftId}`);
              console.log("NFT minted with Token ID:", nftId);
              console.log("Creator:", args.creator);
              console.log("Token URI:", args.tokenURI);
              setIsMinting(false);
              setSteps(2); // Move to the next step
              break;
            }
          } catch {
            // Skip logs that can't be decoded with our ABI
            continue;
          }
        }
      } catch (error) {
        console.error("Error parsing transaction receipt:", error);
        toast.error("NFT minted but failed to get Token ID");
        setIsMinting(false);
      }
    }
  }, [receipt, setNFTId, setSteps]);

  // Function to mint the NFT
  const mintNFT = async () => {
    const nftDetails = getFullNFTDetails();
    // check if all required fields are filled
    if (!nftDetails.name || !nftDetails.description || !nftDetails.image) {
      toast.warning(
        "Please fill in all required fields: Name, Description, and Image.",
      );
      return;
    }
    console.log("Minting NFT with details:", nftDetails);
    setIsMinting(true); // set minting state to true

    // Upload metadata to IPFS
    try {
      const res = await uploadJSONMetadata({
        name: nftDetails.name,
        description: nftDetails.description,
        image: nftDetails.image,
        fallbackImage: nftDetails.fallbackImage,
        attributes: nftDetails.attributes,
        external_link: nftDetails.external_link,
      });
      if (res.success) {
        const ipfsURL = `https://ipfs.io/ipfs/${res.cid}`;
        // console.log(
        //   "Metadata uploaded with CID:",
        //   ipfsURL,
        //   `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${res.cid}`,
        // );
        toast.success("Metadata uploaded successfully!");

        // mint the NFT by calling the smart contract with the IPFS URL
        writeContract(
          {
            address: CRYPTO_CANVAS_NFT_ADDRESS as `0x${string}`,
            abi: cryptoCanvasNFTsABI.abi,
            functionName: "mintNFT",
            args: [ipfsURL], // Use the IPFS URL directly, not the state variable
          },
          {
            onSuccess() {
              toast.loading(
                "Minting transaction sent! Waiting for confirmation...",
              );
            },
            onError(error) {
              console.error("Error minting NFT:", error);
              toast.error("Error minting NFT. Please try again.");
              setIsMinting(false); // Reset loading state on error
            },
          },
        );
      } else {
        toast.error(res.error ?? "Error uploading metadata. Please try again.");
        setIsMinting(false);
        return;
      }
    } catch (error) {
      console.error("Error uploading metadata:", error);
      toast.error("Error uploading metadata. Please try again.");
      setIsMinting(false);
      return;
    }
  };
  // ----------------------------------------------------------------------------------------

  // Add a new attribute
  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: "", value: "" }]);
  };

  // Remove an attribute
  const removeAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  // Update an attribute
  const updateAttribute = (
    index: number,
    field: "trait_type" | "value",
    newValue: string,
  ) => {
    const newAttributes = attributes.map((attr, i) =>
      i === index ? { ...attr, [field]: newValue } : attr,
    );
    setAttributes(newAttributes);
  };

  return (
    <div className="w-full">
      <Card className="w-full max-w-2xl border-2 border-emerald-200/50 bg-gradient-to-br from-white via-emerald-50/30 to-green-50/30 shadow-xl dark:border-gray-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <CardHeader className="rounded-t-lg bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 text-white">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="rounded-lg bg-white/20 p-2">
              <Sparkles className="h-6 w-6" />
            </div>
            Upload Your Artwork
          </CardTitle>
          <CardDescription className="text-emerald-100">
            Create your unique NFT by uploading your artwork and adding
            metadata.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <div className="mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Basic Information
              </h3>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                NFT Name *
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a catchy name for your NFT"
                className="border-gray-300 bg-white/80 transition-colors focus:border-emerald-500 dark:border-gray-600 dark:bg-gray-800/80 dark:focus:border-emerald-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description *
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your artwork, its story, and what makes it unique..."
                rows={4}
                className="resize-none border-gray-300 bg-white/80 transition-colors focus:border-emerald-500 dark:border-gray-600 dark:bg-gray-800/80 dark:focus:border-emerald-400"
              />
            </div>

            {/* External Link */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                External Link (Optional)
              </Label>
              <Input
                value={external_link}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="https://your-website.com or social media"
                className="border-gray-300 bg-white/80 transition-colors focus:border-emerald-500 dark:border-gray-600 dark:bg-gray-800/80 dark:focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Attributes Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                  Attributes & Properties
                </Label>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAttribute}
                className="flex items-center gap-2 border-none bg-gradient-to-r from-emerald-500 to-green-500 text-white transition-all duration-200 hover:from-emerald-600 hover:to-green-600"
              >
                <Plus className="h-4 w-4" />
                Add Attribute
              </Button>
            </div>

            {attributes.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-8 text-center dark:border-gray-600 dark:bg-gray-800/50">
                <Tag className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No attributes added yet. Add some properties to make your NFT
                  more unique!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {attributes.map((attribute, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border-2 border-gray-200 bg-white/60 p-4 transition-colors hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:border-blue-600"
                  >
                    <div className="flex-1">
                      <Input
                        placeholder="Trait Type (e.g., Color, Rarity, Style)"
                        value={attribute.trait_type}
                        onChange={(e) =>
                          updateAttribute(index, "trait_type", e.target.value)
                        }
                        className="border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Value (e.g., Blue, Rare, Abstract)"
                        value={attribute.value}
                        onChange={(e) =>
                          updateAttribute(index, "value", e.target.value)
                        }
                        className="border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAttribute(index)}
                      className="shrink-0 bg-red-500 transition-colors hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileImage className="h-5 w-5 text-green-600 dark:text-green-400" />
              <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                Upload Artwork *
              </Label>
            </div>
            <div className="rounded-lg border-2 border-dashed border-green-300 bg-gradient-to-br from-green-50 to-blue-50 p-4 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700">
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                Supported formats: JPG, PNG, SVG • Maximum size: 10MB
              </p>
              <Dropzone />
            </div>
          </div>
        </CardContent>
        <CardFooter className="rounded-b-lg bg-gray-50 p-6 dark:bg-gray-800/50">
          <div className="flex w-full justify-end">
            <Button
              onClick={mintNFT}
              disabled={isMinting}
              className="rounded-lg bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-emerald-700 hover:via-green-700 hover:to-emerald-700 hover:shadow-xl disabled:opacity-50"
            >
              {isMinting ? (
                <div className="flex items-center gap-3">
                  <Loader2Icon className="h-5 w-5 animate-spin" />
                  <span>Minting Your NFT...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5" />
                  <span>Mint NFT</span>
                </div>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
