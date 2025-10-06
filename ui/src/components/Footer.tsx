"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Twitter,
  Github,
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  Heart,
  Palette,
  Shield,
  Zap,
} from "lucide-react";

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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

  const linkHoverVariants = {
    hover: {
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.footer
      className="bg-background border-border/50 mt-20 border-t"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="bg-primary/20 absolute inset-0 rounded-full blur-lg" />
                <Palette className="text-primary relative h-8 w-8" />
              </div>
              <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                CryptoCanvas
              </span>
            </Link>

            <p className="text-muted-foreground leading-relaxed">
              The premier destination for discovering, creating, and trading
              unique digital art. Join our community of passionate artists and
              collectors.
            </p>

            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <Shield className="text-primary h-4 w-4" />
              <span>Secured by Ethereum blockchain</span>
            </div>

            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <Zap className="text-primary h-4 w-4" />
              <span>Lightning-fast transactions</span>
            </div>
          </motion.div>

          {/* Marketplace Links */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold">Marketplace</h3>
            <nav className="space-y-3">
              {[
                "Explore NFTs",
                "Create NFT",
                "Collections",
                "Artists",
                "Trending",
                "New Drops",
                "Featured",
                "Live Auctions",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={linkHoverVariants}
                  whileHover="hover"
                >
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary group flex items-center transition-colors"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Resources */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold">Resources</h3>
            <nav className="space-y-3">
              {[
                "Help Center",
                "Getting Started",
                "API Documentation",
                "Smart Contracts",
                "Gas Tracker",
                "Wallet Guide",
                "Security Tips",
                "Community Forum",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={linkHoverVariants}
                  whileHover="hover"
                >
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary group flex items-center transition-colors"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Company */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="text-lg font-semibold">Company</h3>
            <nav className="space-y-3">
              {[
                "About Us",
                "Careers",
                "Press Kit",
                "Blog",
                "Partnerships",
                "Contact Us",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={linkHoverVariants}
                  whileHover="hover"
                >
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary group flex items-center transition-colors"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="from-primary/10 via-primary/5 to-primary/10 border-primary/20 mt-16 rounded-2xl border bg-gradient-to-r p-8"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="mb-2 text-2xl font-bold">Stay in the loop</h3>
              <p className="text-muted-foreground">
                Get the latest updates on new collections, featured artists, and
                exclusive drops.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background border-border focus:border-primary w-full rounded-lg border py-3 pr-4 pl-10 transition-colors focus:outline-none"
                />
              </div>
              <motion.button
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          variants={itemVariants}
        >
          {[
            { label: "Total Volume", value: "$5.2M+" },
            { label: "NFTs Created", value: "50K+" },
            { label: "Artists", value: "10K+" },
            { label: "Collections", value: "2K+" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="space-y-2 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-primary text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        className="border-border/50 border-t py-8"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <span>© 2025 CryptoCanvas. Made with</span>
              <Heart className="h-4 w-4 fill-current text-red-500" />
              <span>for the NFT community.</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { icon: Twitter, href: "/", label: "Twitter" },
                { icon: MessageCircle, href: "/", label: "Discord" },
                { icon: Instagram, href: "/", label: "Instagram" },
                { icon: Github, href: "/", label: "GitHub" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-muted/50 hover:bg-primary/20 hover:text-primary rounded-full p-2 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="text-muted-foreground flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};
