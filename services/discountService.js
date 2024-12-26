import Discount from "../models/discountModels.js";
import FinancialReport from "../models/financialReportModel.js";
import mongoose from "mongoose";
const walletSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  balance: { type: Number, required: true },
});

const Wallet = mongoose.model("Wallet", walletSchema);

// Function to apply a discount
export const applyDiscount = async (patientId, doctorId, consultationFee) => {
  try {
    const discountKey = `${patientId}_${doctorId}`;
    const existingDiscount = await Discount.findOne({ patientId, doctorId });

    if (existingDiscount) {
      throw new Error("Discount already used for this doctor by this patient");
    }

    const discountAmount = consultationFee * 0.2;
    const finalFee = consultationFee - discountAmount;

    // Check Wallet Balance
    const wallet = await Wallet.findOne({ patientId });
    if (!wallet || wallet.balance < finalFee) {
      throw new Error("Insufficient wallet balance!");
    }

    // Update Wallet Balance
    wallet.balance -= finalFee;
    await wallet.save();

    // Create Discount Record
    const discount = new Discount({
      patientId,
      doctorId,
      discountAmount,
      consultationFee,
      finalFee,
    });
    await discount.save();

    // Add to Financial Report
    const financialReport = new FinancialReport({
      patientId,
      doctorId,
      discountAmount,
      finalFee,
    });
    await financialReport.save();

    return { message: "Discount applied successfully.", finalFee };
  } catch (err) {
    throw new Error("Failed to apply discount: " + err.message);
  }
};

// Function to fetch financial report
export const getFinancialReport = async () => {
  try {
    const report = await FinancialReport.find();
    return report;
  } catch (err) {
    throw new Error("Failed to fetch financial report: " + err.message);
  }
};
