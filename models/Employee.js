const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    empNo: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
