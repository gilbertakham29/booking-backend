import express from "express";
import Discount from "../models/discountModels.js";
import FinancialReport from "../models/financialReportModel.js";

const router = express.Router();

// Apply a discount
router.post("/apply", async (req, res) => {
  const { patientId, doctorId, consultationFee } = req.body;

  try {
    // Check if the discount has already been applied for this patient-doctor pair
    const existingDiscount = await Discount.findOne({ patientId, doctorId });
    if (existingDiscount) {
      return res.status(400).json({ error: "Discount already applied" });
    }

    // Calculate discount amount (e.g., 20%)
    const discountAmount = consultationFee * 0.2;
    const finalFee = consultationFee - discountAmount;

    // Save the discount details in the database
    const discount = new Discount({
      patientId,
      doctorId,
      consultationFee,
      discountAmount,
      finalFee,
    });
    await discount.save();

    // Save financial report entry
    const report = new FinancialReport({
      patientId,
      doctorId,
      discountAmount,
      finalFee,
      timestamp: new Date(),
    });
    await report.save();

    res
      .status(200)
      .json({ message: "Discount applied successfully", discount });
  } catch (error) {
    res.status(500).json({ error: "Failed to apply discount" });
  }
});

// Get financial report
router.get("/financial-report", async (req, res) => {
  try {
    // Retrieve all financial reports
    const reports = await FinancialReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch financial reports" });
  }
});

export default router;
