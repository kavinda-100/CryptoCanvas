import React from "react";
import Dropzone from "./_components/Dropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateNFTPage = () => {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Upload your artwork</CardTitle>
          <CardDescription>
            Use the form below to upload your artwork and create your NFT.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* form goes here {name, description, attributes, external_link} */}

          {/* Dropzone goes here */}
          <Dropzone />
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateNFTPage;
