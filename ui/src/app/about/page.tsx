"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Palette,
  Shield,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Heart,
  Sparkles,
  Target,
  Eye,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import { SplashCursor } from "@/components/SplashCursor";

export default function AboutPage() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="bg-background min-h-screen">
      <SplashCursor />
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden py-24 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="bg-primary/10 absolute top-20 right-20 h-64 w-64 rounded-full blur-3xl"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="bg-primary/5 absolute bottom-20 left-20 h-96 w-96 rounded-full blur-3xl"
            animate={{
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="space-y-4">
                <motion.div
                  className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-2"
                  variants={itemVariants}
                >
                  <Sparkles className="text-primary h-4 w-4" />
                  <span className="text-primary text-sm font-medium">
                    About CryptoCanvas
                  </span>
                </motion.div>

                <motion.h1
                  className="text-5xl leading-tight font-bold lg:text-7xl"
                  variants={itemVariants}
                >
                  Revolutionizing{" "}
                  <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                    Digital Art
                  </span>{" "}
                  Ownership
                </motion.h1>

                <motion.p
                  className="text-muted-foreground text-xl lg:text-2xl"
                  variants={itemVariants}
                >
                  CryptoCanvas is the premier NFT marketplace where creativity
                  meets blockchain technology. We empower artists and collectors
                  to discover, create, and trade unique digital assets in a
                  secure, transparent ecosystem.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                variants={itemVariants}
              >
                <Button size="lg" asChild className="group">
                  <Link href="/explore" className="flex items-center gap-2">
                    Explore NFTs
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/create">Start Creating</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              className="relative flex justify-center"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Main Circle */}
                <motion.div
                  className="from-primary/20 via-primary/10 relative h-96 w-96 rounded-full bg-gradient-to-br to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {/* Floating Icons */}
                  <motion.div
                    className="bg-primary/20 absolute top-8 left-8 rounded-full p-4"
                    animate={{
                      y: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Palette className="text-primary h-8 w-8" />
                  </motion.div>
                  <motion.div
                    className="bg-primary/20 absolute top-8 right-8 rounded-full p-4"
                    animate={{
                      y: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Shield className="text-primary h-8 w-8" />
                  </motion.div>
                  <motion.div
                    className="bg-primary/20 absolute bottom-8 left-8 rounded-full p-4"
                    animate={{
                      y: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  >
                    <Zap className="text-primary h-8 w-8" />
                  </motion.div>
                  <motion.div
                    className="bg-primary/20 absolute right-8 bottom-8 rounded-full p-4"
                    animate={{
                      y: [-10, 10, -10],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 3,
                    }}
                  >
                    <Globe className="text-primary h-8 w-8" />
                  </motion.div>
                </motion.div>

                {/* Center Logo */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  variants={itemVariants}
                >
                  <div className="bg-primary/10 rounded-full p-8 backdrop-blur-sm">
                    <Palette className="text-primary h-16 w-16" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Mission */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-3">
                  <Target className="text-primary h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To democratize digital art ownership and create a thriving
                ecosystem where artists can monetize their creativity while
                collectors can discover and invest in unique digital assets. We
                believe in the transformative power of blockchain technology to
                revolutionize how art is created, shared, and valued.
              </p>
              <div className="space-y-3">
                {[
                  "Empower artists with blockchain technology",
                  "Create transparent and secure transactions",
                  "Build a global community of creators",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    variants={itemVariants}
                  >
                    <CheckCircle className="text-primary h-5 w-5" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-3">
                  <Eye className="text-primary h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To become the world&apos;s leading NFT marketplace, fostering
                innovation in digital art and setting new standards for
                authenticity, security, and user experience. We envision a
                future where digital ownership is as natural and trusted as
                physical ownership.
              </p>
              <div className="space-y-3">
                {[
                  "Lead the NFT marketplace innovation",
                  "Set industry standards for security",
                  "Bridge traditional and digital art worlds",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    variants={itemVariants}
                  >
                    <Star className="text-primary h-5 w-5" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="bg-muted/30 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 space-y-4 text-center"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold lg:text-5xl">Our Core Values</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              The principles that guide everything we do at CryptoCanvas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Security First",
                description:
                  "Your assets and data are protected by industry-leading security measures and smart contract audits.",
              },
              {
                icon: Heart,
                title: "Community Driven",
                description:
                  "We prioritize our community's needs and feedback, building features that truly matter to creators and collectors.",
              },
              {
                icon: Zap,
                title: "Innovation",
                description:
                  "Constantly pushing boundaries with cutting-edge technology and user experience improvements.",
              },
              {
                icon: Globe,
                title: "Accessibility",
                description:
                  "Making NFTs accessible to everyone, regardless of technical expertise or background.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="group bg-background border-border hover:border-primary/50 rounded-2xl border p-6 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="space-y-4">
                  <div className="bg-primary/10 group-hover:bg-primary/20 w-fit rounded-full p-4 transition-colors">
                    <value.icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 space-y-4 text-center"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold lg:text-5xl">Growing Strong</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Join thousands of artists and collectors who trust CryptoCanvas
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: TrendingUp, value: "$5.2M+", label: "Total Volume" },
              { icon: Palette, value: "50K+", label: "NFTs Created" },
              { icon: Users, value: "10K+", label: "Active Artists" },
              { icon: Globe, value: "2K+", label: "Collections" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="space-y-4 text-center"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-primary/10 mx-auto w-fit rounded-full p-6">
                  <stat.icon className="text-primary h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-primary text-4xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="from-primary via-primary/90 to-primary/80 bg-gradient-to-r py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="mx-auto max-w-4xl space-y-8"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold text-white lg:text-6xl">
              Ready to Join the Revolution?
            </h2>
            <p className="text-xl leading-relaxed text-white/90">
              Whether you&apos;re an artist looking to showcase your work or a
              collector seeking unique digital assets, CryptoCanvas is your
              gateway to the future of art.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="text-primary"
              >
                <Link href="/explore" className="flex items-center gap-2">
                  Explore Marketplace
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/create">Create Your First NFT</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
