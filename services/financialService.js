import FinancialReport from "../models/financialReportModel.js";
const generateReport = async () => {
  try {
    const report = await FinancialReport.find();
    return report;
  } catch (err) {
    throw new Error("Failed to generate financial report: " + err.message);
  }
};

export default generateReport;
