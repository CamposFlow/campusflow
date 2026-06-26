import {registerUniversity} from "../services/solanaService.js"
import {getAllUniversities} from "../services/solanaService.js"

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
        res.status(201).json({
            success: true,
            message: `University registered successfully.`,
            data
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

        res.status(200).json({
            success: true,
            count: universities.length,
            data : universities,
        });
    }catch (err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};