"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dropzone from "../_components/Dropzone";
import { useCreateNFTStoreDetails } from "@/store/createNFTStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  } = useCreateNFTStoreDetails();
  //
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
          {/* Dropzone */}
          <div className="space-y-2">
            <Label>Upload File</Label>
            <p className="text-sm text-gray-500">
              Supported file types: JPG, PNG, SVG. Max size: 10MB.
            </p>
            <Dropzone />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
