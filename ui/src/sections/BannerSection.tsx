"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

const BannerSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="container mx-auto my-16 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="from-primary via-primary/90 to-primary/80 relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 shadow-2xl lg:p-12"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Left Content */}
          <motion.div
            className="flex w-full flex-col gap-6 lg:w-1/2"
            variants={itemVariants}
          >
            {/* Badge */}
            <motion.div
              className="flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm"
              variants={itemVariants}
            >
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">
                Featured Collection
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl font-extrabold text-white lg:text-6xl xl:text-7xl"
              variants={itemVariants}
            >
              Take Your{" "}
              <span className="relative">
                NFT Collection
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full rounded-full bg-white/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </span>{" "}
              to the Next Level
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-white/90 lg:text-xl"
              variants={itemVariants}
            >
              Join our community of passionate creators and collectors to
              explore the future of digital ownership. Discover, buy, and sell
              unique NFTs with complete transparency and security.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap gap-6"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">
                  50K+ NFTs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">
                  10K+ Artists
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">
                  $5M+ Volume
                </span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              variants={itemVariants}
            >
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="group text-primary relative overflow-hidden bg-white hover:bg-white/90"
              >
                <Link href="/explore" className="flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/create">Start Creating</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex w-full items-center justify-center lg:w-1/2"
            variants={imageVariants}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-2xl bg-white/20 blur-2xl" />

              <Image
                src="/banner.png"
                alt="NFT Collection Banner"
                width={400}
                height={400}
                className="relative -scale-x-100 transform rounded-2xl shadow-2xl"
                priority
              />

              {/* Floating badge */}
              <motion.div
                className="absolute top-4 left-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-semibold text-white">
                  Hot Collection 🔥
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default BannerSection;
