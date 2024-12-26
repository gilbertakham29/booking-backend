import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  discountAmount: { type: Number, required: true },
  finalFee: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});
const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
