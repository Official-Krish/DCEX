# Dcex

Dcex is a decentralized exchange platform similar to TipLink, built on the **Solana blockchain**. It integrates **Jupiter Aggregator (jup.ag)** for optimal token swaps and is developed using **Next.js**, **TypeScript**, and **Tailwind CSS** for a modern and efficient user experience.

## Features

- **Solana-Powered:** Fast and low-cost transactions leveraging the Solana blockchain.
- **Jupiter Aggregator Integration:** Ensures the best token swap rates from multiple liquidity sources.
- **Non-Custodial:** Users maintain full control of their funds with secure wallet connections.
- **Next.js + TypeScript:** Optimized for performance, scalability, and maintainability.
- **Tailwind CSS:** Modern UI/UX design with responsive styling.

## Tech Stack

- **Blockchain:** Solana
- **Smart Contract Interaction:** Solana Web3.js, Anchor
- **Swap API:** [Jupiter Aggregator (jup.ag)](https://jup.ag/)
- **Frontend Framework:** Next.js (React)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or npm or pnpm
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli)

### Installation

```sh
# Clone the repository
git clone https://github.com/Official-Krish/DCEX
cd dcex

# Install dependencies
pnpm install  
```

### Environment Setup

Create a `.env.local` file in the root directory and configure the following:

```ini
NEXT_PUBLIC_RPC_URL=<Your Solana RPC URL>
NEXT_PUBLIC_JUPITER_API_URL=https://quote-api.jup.ag/v6/quote
```

### Running the Development Server

```sh
yarn dev  # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app in action.

## Usage

1. Connect your Solana wallet (Phantom, Solflare, or any supported adapter).
2. Select tokens for swapping using the integrated Jupiter API.
3. Execute transactions seamlessly on the Solana blockchain.

## Deployment

To deploy the application, use Vercel or another hosting provider:

```sh
yarn build  # or npm run build
yarn start  # or npm run start
```

## Contribution

Contributions are welcome! To contribute:
- Fork the repository.
- Create a new feature branch.
- Submit a PR for review.

## License

MIT License. See `LICENSE` for details.

## Acknowledgments

- [Solana](https://solana.com/)
- [Jupiter Aggregator](https://jup.ag/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
