const { ethers } = require("hardhat");

async function main() {
    console.log("🔧 Deploying Fixed Escrow Contracts...");
    
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);
    console.log("Network:", network.name);
    
    // Deploy new EscrowFactoryV4 (which will deploy its own EscrowImplementation)
    console.log("\n📦 Deploying EscrowFactoryV4...");
    const EscrowFactoryV4 = await ethers.getContractFactory("EscrowFactoryV4");
    const escrowFactory = await EscrowFactoryV4.deploy();
    await escrowFactory.waitForDeployment();
    const factoryAddress = await escrowFactory.getAddress();
    console.log("✅ EscrowFactoryV4 deployed to:", factoryAddress);
    
    // Authorize the resolver
    const resolverAddress = "0xe841d59Bb054b5cf81cF8BEA1b74EcE5A12550F2";
    console.log("\n🔐 Authorizing resolver...");
    const authTx = await escrowFactory.authorizeResolver(resolverAddress);
    await authTx.wait();
    console.log("✅ Resolver authorized");
    
    console.log(`\n✅ New EscrowFactory deployed: ${factoryAddress}`);
    console.log("Update your resolver config to use this new factory address!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});