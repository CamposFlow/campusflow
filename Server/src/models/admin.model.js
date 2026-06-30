import pool from "../configs/db";

class Admin {
  static async getAllUsers() {
    const res = await pool.query("SELECT * FROM users WHERE role IN ('student', 'staff')");
    return res.rows;
  }
}

export default Admin;