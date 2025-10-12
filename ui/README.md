<div align="center">
  <img src="../imgs/hero-one.png" alt="CryptoCanvas UI" width="400" style="border-radius: 10px; margin: 20px 0;" />
  
  # CryptoCanvas Frontend
  
  <p><strong>Modern Web3 NFT Marketplace Interface</strong></p>
  <p>✨ **LIVE ON VERCEL**: <a href="https://crypto-canvas-nft.vercel.app/">crypto-canvas-nft.vercel.app</a> ✨</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
  [![Tailwind](https://img.shields.io/badge/Tailwind-CSS-teal?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
  [![Wagmi](https://img.shields.io/badge/Wagmi-Web3-orange?style=for-the-badge)](https://wagmi.sh/)
  [![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://crypto-canvas-nft.vercel.app/)
  
</div>

---

## 🌐 Live Platform

**🚀 Access the live platform**: [crypto-canvas-nft.vercel.app](https://crypto-canvas-nft.vercel.app/)

- **Network**: Sepolia Testnet
- **Deployment**: Vercel
- **Status**: ✅ Live & Active
- **IPFS**: Pinata integration

---

## 🛠️ Tech Stack

### Core Framework

- **Next.js 15**: React framework with App Router
- **React 19**: Component-based UI library
- **TypeScript**: Type-safe development

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible components
- **Lucide Icons**: Modern icon library
- **Responsive Design**: Mobile-first approach

### Web3 Integration

- **Wagmi**: React hooks for Ethereum
- **RainbowKit**: Beautiful wallet connection UI
- **Viem**: TypeScript Ethereum library
- **MetaMask**: Primary wallet support

### Infrastructure

- **IPFS**: Pinata for decentralized storage
- **Alchemy**: Sepolia RPC provider
- **Vercel**: Deployment platform
- **bun**: Fast package manager

---

## ✨ Features

### 🎨 For Artists

- **Mint NFTs**: Upload artwork and create NFTs
- **Portfolio Management**: View and manage your creations
- **Custom Pricing**: Set your own listing prices
- **Metadata Support**: Rich NFT descriptions and attributes

### 🛒 For Collectors

- **Browse Gallery**: Discover amazing digital art
- **Secure Purchasing**: Buy NFTs with ETH
- **Collection View**: Track your NFT portfolio
- **Resale Market**: List purchased NFTs for resale

### 🔧 Technical Features

- **Wallet Integration**: Connect with MetaMask and other wallets
- **Real-time Updates**: Live blockchain state synchronization
- **IPFS Storage**: Decentralized metadata and images
- **Responsive UI**: Works perfectly on all devices
- **Error Handling**: User-friendly error messages and recovery

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun**
- **MetaMask** or compatible wallet
- **Sepolia ETH** (for testing)

### Local Development

```bash
# Clone the repository
git clone https://github.com/kavinda-100/CryptoCanvas.git

# Navigate to UI directory
cd CryptoCanvas/ui

# Install dependencies (using bun)
bun install

# Start development server
bun dev

# Open http://localhost:3000
```

### Environment Setup

Create a `.env.local` file:

```env
# Required for IPFS integration
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

---

## 📱 Responsive Design

The platform is fully responsive and optimized for:

- **Desktop**: Full marketplace experience
- **Tablet**: Touch-optimized navigation
- **Mobile**: Compact, finger-friendly interface
- **PWA Ready**: Progressive Web App capabilities

---

## 🔗 Integration

### Smart Contract Connection

- **Network**: Sepolia Testnet
- **Provider**: Alchemy
- **Contract ABIs**: Auto-generated from Foundry
- **Real-time Sync**: Blockchain state updates

### IPFS Integration

- **Provider**: Pinata
- **Metadata Storage**: JSON metadata with image references
- **Fallback URLs**: Multiple IPFS gateways for reliability
- **Upload Support**: Direct file uploads from browser

---

## 🎯 User Journey

1. **Connect Wallet** → RainbowKit modal
2. **Switch Network** → Sepolia testnet prompt
3. **Explore NFTs** → Browse marketplace gallery
4. **Purchase/Mint** → Transaction confirmation
5. **Manage Portfolio** → View owned NFTs
6. **List for Sale** → Create marketplace listings

---

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Bundle Size**: Optimized with Next.js
- **Loading Speed**: Fast initial page load
- **SEO Optimized**: Meta tags and structured data

---

## 🔧 Development Scripts

```bash
# Development
bun dev          # Start dev server
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
bun type-check   # TypeScript checking
```

---

## 🌍 Deployment

The frontend is automatically deployed to Vercel:

- **Production**: [crypto-canvas-nft.vercel.app](https://crypto-canvas-nft.vercel.app/)
- **Preview**: Automatic preview deployments for PRs
- **Environment**: Production-ready configuration

---

## 🎨 Design System

### Colors

- **Primary**: Emerald theme (`emerald-600`)
- **Secondary**: Slate grays for text
- **Accent**: Blue for actions
- **System**: Dark/light mode support

### Typography

- **Headings**: Bold, hierarchy-based sizing
- **Body**: Readable, accessible font sizes
- **Code**: Monospace for technical content

### Components

- **Cards**: Consistent NFT display cards
- **Buttons**: Multiple variants and states
- **Forms**: Accessible input components
- **Modals**: Centered overlay dialogs

---

This frontend provides a complete, production-ready interface for the CryptoCanvas NFT marketplace, featuring modern web technologies and seamless Web3 integration!
