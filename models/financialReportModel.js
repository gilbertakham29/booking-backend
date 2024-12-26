import mongoose from "mongoose";

const financialReportSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  finalFee: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const FinancialReport = mongoose.model(
  "FinancialReport",
  financialReportSchema
);

export default FinancialReport;
