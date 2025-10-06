"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const accordionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={"container mx-auto my-10 grid grid-cols-5"}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/*  section one */}
      <motion.div
        className={"col-span-5 flex flex-col gap-6 px-2 lg:col-span-2 lg:px-0"}
        variants={itemVariants}
      >
        <motion.h1
          className={"text-4xl font-extrabold text-pretty lg:text-[80px]"}
          variants={itemVariants}
        >
          FAQ
        </motion.h1>
        <motion.p
          className={
            "text-muted-foreground text-base font-medium text-pretty lg:mb-3"
          }
          variants={itemVariants}
        >
          Frequently Asked Questions,
          <br />
          Feel free to reach out to us if you have any questions.
        </motion.p>
        <motion.div
          variants={imageVariants}
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={"/faq.png"}
            alt={"FAQ image"}
            width={500}
            height={400}
            className="transition-all duration-300"
          />
        </motion.div>
      </motion.div>

      {/*  section two */}
      <motion.div
        className={
          "col-span-5 flex w-full flex-col items-center justify-center lg:col-span-3"
        }
        variants={accordionVariants}
      >
        <motion.h2
          className="mb-10 text-center text-3xl font-bold text-white lg:text-4xl"
          variants={itemVariants}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Accordion */}
        <motion.div variants={itemVariants} className="w-full max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            <motion.div variants={itemVariants} className="w-full">
              <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger className="w-full text-left text-lg font-semibold text-green-600 transition-colors hover:text-green-500">
                  What is an NFT and how does it work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground w-full text-sm">
                  NFT stands for Non-Fungible Token – a unique digital asset
                  stored on the Ethereum blockchain. Each NFT on CryptoCanvas
                  represents one-of-a-kind digital artwork that can be owned,
                  traded, and displayed in your personal gallery. All ownership
                  is secured by blockchain technology.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <AccordionItem value="item-2" className="w-full">
                <AccordionTrigger className="w-full text-left text-lg font-semibold text-green-600 transition-colors hover:text-green-500">
                  How do I create my own NFT?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground w-full text-sm">
                  Creating NFTs on CryptoCanvas is simple! Connect your wallet,
                  upload your digital artwork (images, GIFs, videos), add
                  metadata like title and description, then mint it on the
                  Ethereum blockchain. Your artwork becomes a tradeable NFT
                  instantly.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <AccordionItem value="item-3" className="w-full">
                <AccordionTrigger className="w-full text-left text-lg font-semibold text-green-600 transition-colors hover:text-green-500">
                  What wallets are supported?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground w-full text-sm">
                  CryptoCanvas supports MetaMask, WalletConnect, and other Web3
                  wallets. We integrate with RainbowKit and Wagmi for seamless
                  wallet connections. Simply click &quot;Connect Wallet&quot;
                  and choose your preferred Ethereum wallet to start creating
                  and trading NFTs.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <AccordionItem value="item-4" className="w-full">
                <AccordionTrigger className="w-full text-left text-lg font-semibold text-green-600 transition-colors hover:text-green-500">
                  Are there any fees for minting or selling NFTs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground w-full text-sm">
                  Minting requires Ethereum gas fees (varies by network
                  activity). CryptoCanvas charges a configurable commission fee
                  on each sale (managed by our Treasury contract) to maintain
                  the platform and support artists. Current marketplace fee is
                  2.5%.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <AccordionItem value="item-5" className="w-full">
                <AccordionTrigger className="w-full text-left text-lg font-semibold text-green-600 transition-colors hover:text-green-500">
                  Is my data and artwork safe?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground w-full text-sm">
                  Absolutely! CryptoCanvas stores metadata on IPFS and all
                  transactions on the Ethereum blockchain. Your artwork
                  ownership is cryptographically verified and tamper-proof. Our
                  smart contracts are thoroughly tested with 100% coverage for
                  maximum security.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <AccordionItem value="item-6" className="w-full">
                <AccordionTrigger className="w-full text-left text-lg font-semibold text-green-600 transition-colors hover:text-green-500">
                  Can I resell my NFT after purchasing?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground w-full text-sm">
                  Yes! Once you own an NFT on CryptoCanvas, you have full
                  ownership rights. You can re-list it on our marketplace,
                  transfer it to another wallet, or even sell it on other
                  compatible NFT platforms. Ownership is permanently recorded on
                  the blockchain.
                </AccordionContent>
              </AccordionItem>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full">
              <AccordionItem value="item-7" className="w-full">
                <AccordionTrigger className="w-full text-left text-lg font-semibold text-green-600 transition-colors hover:text-green-500">
                  What makes NFTs valuable?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground w-full text-sm">
                  NFT value on CryptoCanvas depends on artist reputation,
                  artwork uniqueness, community engagement, and market demand.
                  Our platform features emerging and established digital
                  artists, with transparent ownership history and rarity
                  indicators for informed collecting.
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          </Accordion>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
export default FaqSection;
