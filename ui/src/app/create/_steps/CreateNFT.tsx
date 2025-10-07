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
import { Loader2Icon, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useWriteContract } from "wagmi";
import { uploadJSONMetadata } from "../_actions";

export const CreateNFT = () => {
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
    getFullNFTDetails,
  } = useCreateNFTStoreDetails();
  const [metadataCID, setMetadataCID] = React.useState<string | undefined>(
    undefined,
  );
  const [isMinting, setIsMinting] = React.useState(false);
  const { data: hash, writeContract } = useWriteContract();

  // ----------------------------------------- Mint -----------------------------------------

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
        setMetadataCID(res.cid);
        console.log(
          "Metadata uploaded with CID:",
          `https://ipfs.io/ipfs/${res.cid}`,
          `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${res.cid}`,
        );
        toast.success("Metadata uploaded successfully!");
      } else {
        toast.error(res.error ?? "Error uploading metadata. Please try again.");
        return;
      }
    } catch (error) {
      console.error("Error uploading metadata:", error);
      toast.error("Error uploading metadata. Please try again.");
      return;
    }
    // mint the NFT by calling the smart contract
    // writeContract({
    //   address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
    //   abi,
    //   functionName: "mint",
    //   args: [BigInt(tokenId)],
    // });

    setIsMinting(false); // reset minting state
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
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Upload your artwork</CardTitle>
          <CardDescription>
            Use the form below to upload your artwork and create your NFT.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {/* form goes here {name, description, attributes, external_link} */}
          {/* name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          {/* description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* external link */}
          <div className="space-y-2">
            <Label>External Link</Label>
            <Input
              value={external_link}
              onChange={(e) => setExternalLink(e.target.value)}
            />
          </div>

          {/* Attributes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Attributes</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAttribute}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Attribute
              </Button>
            </div>

            {attributes.length === 0 ? (
              <p className="text-sm text-gray-500">
                No attributes added yet. Click &quot;Add Attribute&quot; to get
                started.
              </p>
            ) : (
              <div className="space-y-3">
                {attributes.map((attribute, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border p-3"
                  >
                    <div className="flex-1">
                      <Input
                        placeholder="Trait Type (e.g., Color, Rarity)"
                        value={attribute.trait_type}
                        onChange={(e) =>
                          updateAttribute(index, "trait_type", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Value (e.g., Blue, Rare)"
                        value={attribute.value}
                        onChange={(e) =>
                          updateAttribute(index, "value", e.target.value)
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAttribute(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropzone */}
          <div className="space-y-2">
            <Label>Upload File</Label>
            <p className="text-sm text-gray-500">
              Supported file types: JPG, PNG, SVG. Max size: 10MB.
            </p>
            <Dropzone />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={mintNFT} disabled={isMinting}>
            {isMinting ? (
              <div className="flex gap-2">
                <Loader2Icon className="size-5 animate-spin" /> Minting...
              </div>
            ) : (
              "Mint NFT"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
