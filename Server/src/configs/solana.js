import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

// Connect to Devnet
const connection = new Connection(process.env.SOLANA_NETWORK, "confirmed");

// Load backend wallet
const secretKey = JSON.parse(process.env.WALLET_SECRET_KEY);
const wallet = Keypair.fromSecretKey(Uint8Array.from(secretKey));
const anchorWallet = new anchor.Wallet(wallet);

// Load IDL
const idl = JSON.parse(readFileSync("./idl/campusflow.json", "utf8"));

// Program ID
const programId = new PublicKey(process.env.PROGRAM_ID);

// Provider
const provider = new anchor.AnchorProvider(connection, anchorWallet, {
    commitment: "confirmed",
});

anchor.setProvider(provider);

// Program interface
const program = new anchor.Program(idl, provider);

export { program, provider, connection, wallet, programId };