import {program, wallet, keypair} from "../configs/solana.js"
import {PublicKey, SystemProgram} from "@solana/web3.js";
import {publicKey} from "@solana/web3.js/src/layout.ts";

export const registerUniversity = async (universityId, name)=>{
    const [universityPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("university"),Buffer.from(universityId)],
        program.programId
    );
    const tx = await program.methods.registerUniversity(universityId, name).accounts({
            university : universityPDA,
            authority : wallet.publicKey,
            systemProgram: SystemProgram.programId,
        }).signers([keypair])
        .rpc()

    return{
        tx,
        universityPDA : universityPDA.toString(),
    };
};

export const getUniversity = async (universityId) => {
    const [universityPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("university"),Buffer.from(universityId)],
        program.programId
    );

    const data = await program.account.university.fetch(universityPDA);

    return{
        universityPDA : universityPDA.toString(),
        universityId : data.universityId,
        name : data.name,
        admin : data.admin.toString(),
        timestamp : data.timestamp.toString(),
        isActive : data.isActive,
    };
};

export const getAllUniversities = async ()=>{
    const universities = await program.account.university.all();
     return universities.map((item)=>({
         universityPDA : item.publicKey.toString(),
         universityId : item.account.universityId,
         name : item.account.name,
         admin : item.account.admin.toString(),
         timestamp : item.account.timestamp.toString(),
         isActive : item.account.isActive,
     }));
};

export const reportIncident =async ({
    universityId, studentId, incidentId, studentName, latitude, longitude,description
})=>{
    const [universityPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("university"),Buffer.from(universityId)],
        program.programId
    );
    const [incidentPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("incident"),Buffer.from(universityId),Buffer.from(studentId),Buffer.from(incidentId)],
        program.programId
    );
    const tx = await program.methods
        .reportIncident(incidentId,studentId,studentName,latitude.toString(),longitude.toString(),description)
        .accounts({
            incident : incidentPDA,
            university: universityPDA,
            authority : wallet.publicKey,
            systemProgram: SystemProgram.programId,
        })
        .signers([keypair])
        .rpc();
    return{ tx, incidentPDA:incidentPDA.toString()};
};