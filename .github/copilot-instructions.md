# Copilot Instructions

# Project Overview

This repository is a project that I use to learn and experiment with new web3 technologies. It is used for my portfolio.
This project name is `CryptoCanvas`. CryptoCanvas is a decentralized application (dApp) that allows users to create, buy, and sell digital art on the Ethereum blockchain. Users can mint their artwork as NFTs (Non-Fungible Tokens) and showcase them in a gallery/UI.
This project has two main components: a frontend built with React + NextJS, a backend powered by smart contracts written in Solidity with Foundry.

# Technologies Used

- **Frontend**: React, NextJS, Tailwind CSS, Shadcn/UI, lucide-icons, and TypeScript
- **Backend**: Solidity, Foundry = (development and testing framework for Ethereum smart contracts)
- **Blockchain**: Ethereum (using Sepolia for production and anvil for development)
- **IPFS**: For storing digital art metadata and images (plan to use)
- **Web3 Libraries**: Wagmi, rainbowkit

# Project Structure

The project is organized into several key folders and files:

## The Main Folders

- `contracts`: Contains the Solidity smart contracts for the dApp.
- `ui`: Contains the React + NextJS frontend code for the dApp.
- `imgs`: Contains images used in the project.

## Additional Files

- `README.md`: Provides an overview of the project, setup instructions, and other relevant information.
- `.gitmodules`: Manages Git submodules for the `contract` folder.
- `.github/copilot-instructions.md`: Contains instructions for GitHub Copilot to assist with code generation and suggestions.
- `.vscode/settings.json`: Configuration settings for Visual Studio Code specific to this project.
- `License`: The license under which the project is distributed.

# Development Setup

To check out the project set up the development environment/dependencies, follow these steps:

1. for contracts:

   - navigate to the `contracts` folder.
   - dependencies are managed using git submodules. and by `foundry.toml` and `foundry.lock` file.
   - local development commands and deployment commands are in `Makefile`.
   - source code is in `contracts/src` folder.
   - tests are in `contracts/test` folder.
   - deployments scripts are in `contracts/script` folder.

2. for frontend/UI:
   - navigate to the `ui` folder.
   - use `bun` as package manager.
   - dependencies are managed using `package.json` and `bun.lock` file.
   - source code is in `ui/src` folder. (it contains `app`, `components`, `lib`, `providers`, and `styles` folder and some files like `env,ts` and `config.ts`).
   - tests are not done for UI.

# Features

- Users can create and mint their digital art as NFTs.
- Users can buy and re-sell NFTs on the platform.
- All the transactions are recorded on the Ethereum blockchain.
- Users can view their owned NFTs in a personal gallery.
- Users can explore and discover art created by other users.
- The platform supports wallet integration for seamless transactions.
- The application is responsive and works well on both desktop and mobile devices.
- Users can connect their Ethereum wallets (like MetaMask) to interact with the dApp.
- The smart contracts are designed to be secure and efficient.
- The platform supports metadata standards for NFTs (like ERC-721).
- Users can view detailed information about each NFT, including ownership history.
- All the transactions are transparent and can be verified on the blockchain.
- The platform is designed to be user-friendly and intuitive.
- All the transactions after user buy NFT, the ownership is transferred to the buyer and the seller gets the payment in their wallet.
- And also the platform get a small commission fee on each sale to sustain the platform.
- The commission fee percentage is configurable by the platform admin/owner.
- The commission is manage in the Treasury smart contract by the admin/owner.
- Only the admin/owner can change the commission fee percentage and withdraw funds.
- The application is built using modern web technologies (React, Next.js, Tailwind CSS, etc.).
- The backend is powered by Ethereum smart contracts.

# Code Generation Instructions

When generating code, please follow these guidelines:

- Ensure that the code adheres to best practices for both frontend and backend development.
- Maintain consistency in coding style and conventions throughout the project.
- For Solidity contracts, ensure proper use of visibility specifiers, events, and error handling.
- For React components, ensure proper state management and component structure.
- Write clear and concise comments to explain the purpose and functionality of the code.
- Use Proper naming conventions for variables, functions, and components.
- Use respective programming language best practices and patterns (TypeScript and Solidity).
- Ensure that the code is modular and reusable where applicable.
- When generating tests, ensure that they cover various edge cases and scenarios (specifically for smart contracts tests).
- Ensure that the code is optimized for performance and security, especially for smart contracts.
- When generating styles for the UI/Frontend, use Tailwind CSS classes and follow the design system established in the project.
- Ensure that when applying styles, always consider responsiveness and accessibility.
- Ensure that when applying styles, always look at the theme configuration in `ui/src/styles/global.css` file.
- Ensure that when applying styles, always go for tailwind CSS unless there is a specific reason to write custom CSS.
- If there any custom CSS is needed, ask for it explicitly or give suggestions like library or framework to use if possible. as an example for when you need to add a complex custom animation in raw CSS we can use library like `framer-motion`.
- use `lucide-icons` for icons in the UI/Frontend.
- when generating custom `SVG` icons. put them in `ui/public/svgIcons` folder.
- When generating configuration files, ensure that they are properly structured and include necessary settings for the project.
- When work with `README.md` files, ensure that they provide clear and comprehensive information about the project, setup instructions, and usage guidelines. also add `Icons` and any necessary things like tables, code snippets, diagrams where necessary to make it visually appealing.
- When generating `Makefile`, ensure that it includes all necessary commands for building, testing, and deploying the project.
