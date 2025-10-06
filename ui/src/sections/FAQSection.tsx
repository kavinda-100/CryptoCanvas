import React from "react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  return (
    <div className={"container mx-auto my-10 grid grid-cols-5"}>
      {/*  section one */}
      <div
        className={"col-span-5 flex flex-col gap-6 px-2 lg:col-span-2 lg:px-0"}
      >
        <h1 className={"text-4xl font-extrabold text-pretty lg:text-[80px]"}>
          FAQ
        </h1>
        <p
          className={
            "text-muted-foreground text-base font-medium text-pretty lg:mb-3"
          }
        >
          Frequently Asked Questions,
          <br />
          Feel free to reach out to us if you have any questions.
        </p>
        <Image src={"/faq.png"} alt={"FAQ image"} width={500} height={400} />
      </div>

      {/*  section two */}
      <div
        className={
          "col-span-5 flex w-full flex-col items-center justify-center lg:col-span-3"
        }
      >
        <h2 className="mb-10 text-center text-3xl font-bold text-white lg:text-4xl">
          Frequently Asked Questions
        </h2>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-2xl"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-green-600">
              What is an NFT and how does it work?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              NFT stands for Non-Fungible Token – a unique digital asset stored
              on the blockchain. Each NFT is one of a kind and can represent
              art, collectibles, and more. You can buy, sell, or trade NFTs on
              our platform securely.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-green-600">
              How do I create my own NFT?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              Just sign in, go to your dashboard, and use our built-in NFT
              generator. Upload your artwork or use our AI image builder, set
              your preferences, and mint it on-chain!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold text-green-600">
              What wallets are supported?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              We support MetaMask and WalletConnect-compatible wallets. You can
              easily connect and start transacting NFTs securely.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold text-green-600">
              Are there any fees for minting or selling NFTs?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              Yes, a small gas fee is required for minting. We also take a 2.5%
              marketplace fee on each sale to keep the platform running
              smoothly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold text-green-600">
              Is my data and artwork safe?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              Absolutely. All your data is securely encrypted and stored. NFTs
              are recorded on the blockchain, making them tamper-proof and
              verifiable.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-semibold text-green-600">
              Can I resell my NFT after purchasing?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              Yes! Once you purchase an NFT, it’s yours to keep, sell, or trade.
              You can list it back on our marketplace or transfer it to another
              wallet anytime.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg font-semibold text-green-600">
              What makes NFTs valuable?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              NFTs derive their value from uniqueness, ownership history,
              creator reputation, and market demand. Limited-edition drops and
              community engagement also boost value.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default FaqSection;
