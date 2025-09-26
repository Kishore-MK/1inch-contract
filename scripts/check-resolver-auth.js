const { ethers } = require("hardhat");

async function main() {
    console.log("🔍 Checking Resolver Authorization...");
    
    const resolverAddress = "0xe841d59Bb054b5cf81cF8BEA1b74EcE5A12550F2";
    
    // Sepolia contracts
    console.log("\n📍 SEPOLIA:");
    const sepoliaFactory = await ethers.getContractAt("EscrowFactoryV4", "0x9E12f1D513b90F64dd45dE7bE20983DE6152E870");
    const sepoliaSettlement = await ethers.getContractAt("MinimalSettlement", "0xC144D565e799ed813e09d2D43FEC191caC564Ec4");
    
    const sepoliaFactoryAuth = await sepoliaFactory.authorizedResolvers(resolverAddress);
    const sepoliaSettlementAuth = await sepoliaSettlement.authorizedResolvers(resolverAddress);
    
    console.log(`EscrowFactory authorized: ${sepoliaFactoryAuth}`);
    console.log(`Settlement authorized: ${sepoliaSettlementAuth}`);
    
     
    // Fix authorization if needed
    if (!sepoliaFactoryAuth || !sepoliaSettlementAuth || !celoFactoryAuth || !celoSettlementAuth) {
        console.log("\n🔧 Fixing Authorization...");
        
        const [deployer] = await ethers.getSigners();
        console.log("Using deployer:", deployer.address);
        
        if (!sepoliaFactoryAuth) {
            console.log("Authorizing resolver on Sepolia EscrowFactory...");
            const tx1 = await sepoliaFactory.authorizeResolver(resolverAddress);
            await tx1.wait();
            console.log("✅ Sepolia EscrowFactory authorized");
        }
        
        if (!sepoliaSettlementAuth) {
            console.log("Authorizing resolver on Sepolia Settlement...");
            const tx2 = await sepoliaSettlement.authorizeResolver(resolverAddress);
            await tx2.wait();
            console.log("✅ Sepolia Settlement authorized");
        }
        
      
        
        console.log("\n🎉 All authorizations fixed!");
    } else {
        console.log("\n✅ All contracts are properly authorized!");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});