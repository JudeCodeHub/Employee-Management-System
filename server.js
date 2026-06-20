require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employee = require("./models/Employee");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: 1 });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/employees", async (req, res) => {
  const { name, designation, salary } = req.body;
  if (!name || !designation || salary === undefined) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const charRegex = /^[A-Za-z\s]+$/;
  if (!charRegex.test(name))
    return res
      .status(400)
      .json({ error: "Name can only contain letters and spaces" });
  if (!charRegex.test(designation))
    return res
      .status(400)
      .json({ error: "Designation can only contain letters and spaces" });
  if (salary < 0)
    return res.status(400).json({ error: "Salary cannot be negative" });

  try {
    const allEmployees = await Employee.find({}, "empNo");
    let maxId = 0;
    allEmployees.forEach((emp) => {
      const num = parseInt(emp.empNo, 10);
      if (!isNaN(num) && num > maxId) {
        maxId = num;
      }
    });
    const empNo = (maxId + 1).toString();

    const employee = await Employee.create({
      empNo,
      name,
      designation,
      salary,
    });
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Employee No must be unique" });
    }
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  const { name, designation, salary } = req.body;

  const charRegex = /^[A-Za-z\s]+$/;
  if (name && !charRegex.test(name))
    return res
      .status(400)
      .json({ error: "Name can only contain letters and spaces" });
  if (designation && !charRegex.test(designation))
    return res
      .status(400)
      .json({ error: "Designation can only contain letters and spaces" });
  if (salary !== undefined && salary < 0)
    return res.status(400).json({ error: "Salary cannot be negative" });

  try {
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, designation, salary },
      { new: true },
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
