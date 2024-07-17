// routes/attendance.js
import express from 'express';
import con from "../utils/db.js"; // Example path
const router = express.Router();

router.post("/attendance", (req, res) => {
    const { name, timeIn, timeOut } = req.body;
    // Example SQL query to insert attendance record
    const sql = "INSERT INTO attendance (name, timein, timeout) VALUES (?, ?, ?)";
    con.query(sql, [name, timeIn, timeOut], (err, result) => {
      if (err) {
        console.error("Error marking attendance:", err);
        return res.status(500).json({ error: "Error marking attendance" });
      }
      
      return res.status(200).json({ message: "Attendance marked successfully" });
    });
});

export { router as AttendanceRouter };
