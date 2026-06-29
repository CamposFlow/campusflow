import {registerUniversity} from "../services/solanaService.js"
import {getAllUniversities} from "../services/solanaService.js"
import University from "../models/University.js";
import {wallet} from '../configs/solana.js'
import {reportIncident} from '../services/solanaService.js'
import createIncident from '../models/University.js'
import crypto from 'crypto'

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

export const createIncidentReport = async (req, res) => {
    try{
        const {category, locationText, description, latitude, longitude} = req.body;
        const studentId = req.user.id;
        const studentName = req.user.fullname;
        const universityId = req.user.university;
        const incidentId = crypto.randomUUID();
        const timestamp = Math.floor(Date.now() / 1000);

        // const chainResult = await reportIncident({
        //     universityId,
        //     studentId: studentId.toString(),
        //     incidentId,
        //     studentName,
        //     latitude,
        //     longitude,
        //     description,
        // });

      //  commented the chain writing out for now

        const dbRecord = await createIncident.create({
            incidentId,
            studentId,
            studentName,
            category,
            locationText,
            latitude,
            longitude,
            description,
            universityId: "FUTO_UNI",
            timestamp,
            txSignature : null, //chainResult.tx,
            pdaAddress : null,  //chainResult.incidentPDA,
        })
        res.status(200).json({success:true, message: `Incident reported Successfully.`, data: dbRecord});
    }catch (err){
        res.status(500).json({success:false, message: err.message,});
    }
};