import pool from "../configs/db"

class Student {
  static async getAllStudents() {
    const res = await pool.query("SELECT * FROM users WHERE role = student");
    console.log(res.rows[0]);
  }
}