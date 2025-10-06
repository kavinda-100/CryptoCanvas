"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, TrendingUp, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";

const SecondHeroSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  };

  const features = [
    {
      icon: Shield,
      title: "Secure",
      description: "Blockchain-backed security",
    },
    {
      icon: Zap,
      title: "Fast",
      description: "Lightning-quick transactions",
    },
    {
      icon: TrendingUp,
      title: "Growing",
      description: "Expanding marketplace",
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-16 lg:py-24 dark:from-[#1C1C1E] dark:via-[#2C2C2E] dark:to-[#1C1C1E]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Animated background elements */}
        <motion.div
          className="bg-primary/10 absolute top-20 right-20 h-64 w-64 rounded-full blur-3xl"
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
          className="bg-primary/5 absolute bottom-20 left-20 h-64 w-64 rounded-full blur-3xl"
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

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Section - Content */}
          <motion.div
            className="order-2 flex flex-col gap-8 px-4 lg:order-1 lg:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Animated decorative line */}
            <motion.div className="flex gap-2" variants={itemVariants}>
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-primary h-2 w-2 rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.3,
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl leading-tight font-extrabold text-gray-900 lg:text-6xl xl:text-7xl dark:text-white"
              variants={itemVariants}
            >
              Game Changers for{" "}
              <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                Online Investment
              </span>{" "}
              Strategy Of NFTs
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg leading-relaxed text-gray-600 lg:text-xl dark:text-gray-300"
              variants={itemVariants}
            >
              Join our community of passionate NFT enthusiasts and discover the
              limitless possibilities of digital ownership. Whether you&apos;re
              an artist or a collector, our platform provides the tools you need
              to thrive.
            </motion.p>

            {/* Feature Cards */}
            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              variants={itemVariants}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="group border-primary/20 hover:border-primary/40 relative overflow-hidden rounded-lg border bg-white/80 p-4 backdrop-blur-sm transition-all hover:bg-white/90 dark:bg-black/30 dark:hover:bg-black/50"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <feature.icon className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Button
                variant="default"
                size="lg"
                asChild
                className="group relative overflow-hidden"
              >
                <Link href="/explore" className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Explore NFTs
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Section - Image */}
          <motion.div
            className="order-1 flex items-center justify-center px-4 lg:order-2 lg:px-0"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="group relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glowing border effect */}
              <div className="from-primary via-primary/50 to-primary absolute -inset-1 rounded-2xl bg-gradient-to-r opacity-75 blur-lg transition duration-300 group-hover:opacity-100" />

              {/* Image container */}
              <div className="border-primary/30 relative overflow-hidden rounded-2xl border-2 bg-white dark:bg-black">
                <Image
                  src="/hero-two.png"
                  alt="NFT Investment Strategy"
                  width={600}
                  height={800}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-black/60" />

                {/* Floating badge */}
                <motion.div
                  className="border-primary/30 absolute top-4 right-4 rounded-full border bg-white/90 px-4 py-2 backdrop-blur-sm dark:bg-black/80"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    <span className="text-primary">50K+</span> NFTs
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecondHeroSection;
