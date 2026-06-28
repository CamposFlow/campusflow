import {registerUniversity} from "../services/solanaService.js"
import {getAllUniversities} from "../services/solanaService.js"
import University from "../models/University.js";
import {wallet} from '../configs/solana.js'

export const createUniversity = async (req, res) => {
    try{
        const {universityId, name} = req.body;

        if(!name || !universityId){
            return res.status(400).json({
                success: false,
                message: "University ID and name are required."
            });
        }
        const data = await registerUniversity(universityId, name);
        const dbRecord = await University.create({
            universityId,
            name,
            admin: wallet.publicKey.toString(),
            timestamp: Math.floor(Date.now() / 1000),
            txSignature: data.tx,
            pdaAddress: data.universityPDA,
        });

        res.status(201).json({
            success: true,
            message: `University registered successfully.`,
            data,
            db : dbRecord,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

export const fetchAllUniversity = async (req, res) => {
    try{
        const universities = await getAllUniversities();
            const allUni = await University.findAll();
        res.status(200).json({
            success: true,
            count: universities.length,
            data : universities,
            db : allUni,
        });
    }catch (err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};