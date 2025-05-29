# 🧱 Simple Blockchain in TypeScript
This project is a minimal and educational implementation of a blockchain, written in TypeScript. It aims to demonstrate the core concepts behind how a blockchain works — including block creation, hashing, proof of work, and chain validation — in a clear and easy-to-understand way.

## ✨ Features
- Immutable chain of blocks
- SHA-256 hash generation
- Basic Proof of Work (difficulty-based mining)
- Automatic block linking via previousHash
- Chain validation logic to detect tampering

## 🚀 Installation
Clone the repository and run:
```
npm install
npm run build
npm run start
```

## 📁 Structure
```
.
├── src/
│   ├── block.ts        # Block structure and hashing logic
│   ├── blockchain.ts   # Blockchain logic (add, validate, etc.)
│   └── index.ts        # Demo and testing script
```
- block.ts — Defines the block structure and hashing logic
- blockchain.ts — Manages the blockchain operations and validation
- index.ts — Entry point for creating and interacting with the chain

## Example usage
```ts
import { create_blockchain, add_block, validate_blockchain } from './blockchain'

const transactions = create_blockchain("Genesis Block", 4)

add_block(transactions, { from: "Alice", to: "Bob", amount: 50 })
add_block(transactions, { from: "Carlos", to: "Dan", amount: 100 })

console.log(validate_blockchain(chain))
```

## 🔒 Proof of Work
Each block must generate a hash that begins with a certain number of zeros (defined by difficulty). This simulates the mining process and protects the chain from tampering.

