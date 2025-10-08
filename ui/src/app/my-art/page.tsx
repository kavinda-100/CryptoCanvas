import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActiveNFTs } from "./_tabs/ActiveNFTs";
import { InActiveNFTs } from "./_tabs/InActiveNFTs";

const MyArtPage = () => {
  return (
    <section className="w-full">
      <Tabs defaultValue="activeNFTs" className="w-full">
        <TabsList>
          <TabsTrigger value="activeNFTs">Active NFTs</TabsTrigger>
          <TabsTrigger value="inActiveNFTs">Inactive NFTs</TabsTrigger>
        </TabsList>
        <TabsContent value="activeNFTs">
          <ActiveNFTs />
        </TabsContent>
        <TabsContent value="inActiveNFTs">
          <InActiveNFTs />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MyArtPage;
