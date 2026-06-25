import { program, connection } from "../configs/solana.js";

const testConnection = async () => {
    try {
        const slot = await connection.getSlot();
        console.log("Connected to Solana Devnet ✅");
        console.log("Current slot:", slot);
        console.log("Program ID:", program.programId.toString());
    } catch (error) {
        console.error("Connection failed ❌", error);
    }
};

testConnection();