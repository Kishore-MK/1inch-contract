# Smart Contracts - Cross-Chain Bridge & 1inch Fusion+ Integration

## Overview

Contracts contains a comprehensive **cross-chain bridge infrastructure** built on **1inch Fusion+ architecture** enabling atomic swaps between Ethereum and Tron networks using Hash Time Locked Contracts (HTLCs).

## Core Contract Architecture

### **Primary Contracts**

1. **`CrossChainSwap.sol`** - Main HTLC bridge contract
   - Creates cross-chain swap orders with hash/time locks
   - Manages order lifecycle (create → complete → refund)
   - Authorized resolver network for trustless execution
   - Built-in timelock safety mechanisms (30min minimum)

2. **`Escrow.sol`** - Atomic swap escrow implementation
   - Multi-phase execution: Finality → Private → Public → Cancellation
   - Secret revelation mechanism for token unlocking
   - Immutable contract parameters for security
   - Time-based withdrawal/cancellation periods

3. **`EscrowFactory.sol`** - CREATE2 factory pattern
   - Deterministic escrow contract deployment
   - Resolver authorization system
   - Event-driven escrow creation
   - Gas-optimized contract instantiation

4. **`LimitOrderProtocolV4.sol`** - 1inch Fusion+ integration
   - Professional order management system
   - Gas-optimized execution
   - Advanced order types support

### **Supporting Contracts**

- **`CrossChainSettlement.sol`** - Settlement layer coordination
- **`MinimalSettlement.sol`** - Lightweight settlement implementation
- **`TrueERC20.sol`** - ERC20 utility token
- **`MockERC20.sol`** & **`WETH.sol`** - Testing utilities

## 🔧 Key Features

### **Security Features**
- ✅ **Hash Locks**: Cryptographic secret protection
- ✅ **Time Locks**: Automatic refund mechanism
- ✅ **Reentrancy Protection**: OpenZeppelin ReentrancyGuard
- ✅ **Access Control**: Resolver authorization system
- ✅ **Emergency Functions**: Owner emergency withdrawal

### **Cross-Chain Capabilities**
- ✅ **Ethereum Sepolia** & **Tron Shasta** support
- ✅ **Atomic Swap** guarantee (complete on both or neither)
- ✅ **Professional Resolver Network** for automation
- ✅ **Multi-token Support** (USDC primary, extensible)

##  Deployment Configuration

### **Networks Supported**
```javascript
sepolia: {
  chainId: 11155111,
  weth: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
  usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
}
```

### **Build & Deploy**
```bash
npm install           # Install dependencies
npm run build         # Compile contracts
npm run deploy:sepolia # Deploy to Sepolia
```

### **Key Addresses** (Sepolia Testnet)
- **EscrowFactory**: `0x3FC015Ba470Ad3F82e1B61A39D302030f950D541`
- **Settlement**: `0x62aC065771582Da03a8fb03F118374CB63b378B2`
- **Resolver**: `0x917999645773E99d03d44817B7318861F018Cb74`

## 💡 Contract Interaction Flow

```mermaid
graph LR
    A[User] --> B[CrossChainSwap]
    B --> C[OrderCreated Event]
    C --> D[Resolver]
    D --> E[EscrowFactory]
    E --> F[Escrow Contract]
    F --> G[Token Transfer]
```

## Project Structure

```
contracts/
├── contracts/                    # Smart contract source files
│   ├── CrossChainSwap.sol       # Main HTLC bridge contract
│   ├── Escrow.sol              # Atomic swap escrow implementation
│   ├── EscrowFactory.sol       # CREATE2 factory for escrows
│   ├── EscrowFactoryV4.sol     # Enhanced factory version
│   ├── LimitOrderProtocolV4.sol # 1inch Fusion+ integration
│   ├── CrossChainSettlement.sol # Settlement coordination
│   ├── MinimalSettlement.sol   # Lightweight settlement
│   ├── TrueERC20.sol          # Utility ERC20 token
│   ├── MockERC20.sol          # Mock token for testing
│   └── WETH.sol               # Wrapped Ether implementation
├── fusion-protocol/             # 1inch Fusion+ core contracts
├── scripts/                     # Deployment and utility scripts
│   ├── deploy-complete-stack.js # Full stack deployment
│   ├── deploy-fusion-stack.js  # Fusion-specific deployment
│   └── add-resolver.js         # Resolver management
├── deployments/                 # Network deployment configs
├── test/                       # Contract test suites
├── hardhat.config.js           # Hardhat configuration
├── package.json               # Project dependencies
└── README.md                  # This file
```

## 🔐 Contract APIs

### **CrossChainSwap**
```solidity
// Create a new cross-chain order
function createOrder(
    address token,
    uint256 amount,
    uint256 destinationChainId,
    address destinationToken,
    bytes32 hashLock,
    uint256 timelock
) external returns (bytes32 orderId);

// Complete order with secret revelation
function completeOrder(bytes32 orderId, bytes32 secret) external;

// Refund expired order
function refundOrder(bytes32 orderId) external;
```

### **EscrowFactory**
```solidity
// Create escrow for cross-chain swap
function createEscrow(
    bytes32 orderHash,
    address token,
    uint256 amount,
    bytes32 hashLock,
    uint256 timeLocks,
    address maker,
    address taker
) external payable returns (address escrowAddress);
```

### **Escrow**
```solidity
// Withdraw tokens with secret
function withdraw(bytes32 secret) external;

// Cancel and refund tokens
function cancel() external;

// Get current escrow state
function getState() external view returns (string memory);
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test
npm test -- --grep "CrossChainSwap"

# Run with coverage
npm run coverage
```

## 🛠️ Development Setup

### **Prerequisites**
- Node.js 16+
- Hardhat
- MetaMask/TronLink for testing

### **Environment Setup**
1. Copy `.env.example` to `.env`
2. Add your private keys and RPC URLs
3. Install dependencies: `npm install`
4. Compile contracts: `npm run build`

### **Network Configuration**
Update `hardhat.config.js` for additional networks:
```javascript
networks: {
  sepolia: {
    url: "https://ethereum-sepolia-rpc.publicnode.com",
    accounts: [PRIVATE_KEY],
    chainId: 11155111
  }
}
```

## 🔒 Security Considerations

### **HTLC Security Model**
- **Hash Locks**: Prevent unauthorized access without secret
- **Time Locks**: Ensure refund capability after expiration
- **Atomic Operations**: Complete on both chains or fail entirely
- **Resolver Authorization**: Only whitelisted resolvers can execute

### **Best Practices**
- Always test on testnets first
- Verify contract addresses before interactions
- Monitor timelock expiration
- Use proper secret generation and storage
- Validate cross-chain addresses format

### **Known Limitations**
- **Testnet Deployment**: Current contracts are testnet-only
- **Token Support**: Limited to USDC and major tokens initially
- **Resolver Dependency**: Requires active resolver network
- **Gas Optimization**: Further optimization needed for mainnet

## 🐛 Troubleshooting

### **Common Issues**

#### **Deployment Fails**
- Check network connectivity and RPC URLs
- Ensure sufficient ETH balance for gas
- Verify private key permissions
- Check Hardhat configuration

#### **Transaction Reverts**
- Verify token approvals and balances
- Check timelock parameters (minimum 30 minutes)
- Ensure resolver authorization
- Validate hash lock format

#### **Cross-Chain Issues**
- Confirm both networks are supported
- Check resolver network status
- Verify destination address format
- Monitor event emissions

 
