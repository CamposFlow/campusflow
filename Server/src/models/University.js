import pool from '../configs/db.js'

class University {
    static async create({ universityId, name, admin, timestamp, txSignature, pdaAddress }) {
        const res = await pool.query(
            `INSERT INTO universities (university_id, name, admin, timestamp, tx_signature, pda_address)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [universityId, name, admin, timestamp, txSignature, pdaAddress]
        );
        return res.rows[0];
    }

    static async findByUniversityId(universityId) {
        const res = await pool.query(
            'SELECT * FROM universities WHERE university_id = $1',
            [universityId]
        );
        return res.rows[0];
    }

    static async findAll() {
        const res = await pool.query('SELECT * FROM universities ORDER BY id DESC');
        return res.rows;
    }


    static async createIncident({
                            incidentId,
                            studentId,
                            studentName,
                            category,
                            locationText,
                            latitude,
                            longitude,
                            description,
                            universityId,
                            timestamp,
                            txSignature,
                            pdaAddress
                        }) {
        const res = await pool.query(
            `INSERT INTO incidents
             (incident_id, student_id, student_name, category, location_text, latitude, longitude, description, university_id, timestamp, tx_signature, pda_address)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             RETURNING *`,
            [incidentId, studentId, studentName, category, locationText, latitude, longitude, description, universityId, timestamp, txSignature, pdaAddress]
        );
        return res.rows[0];
    }

    static async findByIncidentId(incidentId) {
        const res = await pool.query(
            'SELECT * FROM incidents WHERE incident_id = $1',
            [incidentId]
        );
        return res.rows[0];
    }

    static async findAllIncidents(incidentId) {
        const res = await pool.query('SELECT * FROM incidents ORDER BY created_at DESC');
        return res.rows;
    }

}

export default University;
