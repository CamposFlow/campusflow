
import { ethers } from "hardhat";

async function main() {
    console.log("Deploying Calculator Contract");
    
    const Calculator = await ethers.getContractFactory("Calculator");

    const calculator = await Calculator.deploy();

    await calculator.waitForDeployment();

    console.log("calculator deployed to:", await calculator.getAddress());
    
}

main().catch((error)=>{
    console.log(error);
    process.exitCode = 1;
});