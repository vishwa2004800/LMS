const express = require("express");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const path = require("path");
const UserCourseProgress = require("../models/UserCourseProgress");

const router = express.Router();

// Generate Certificate PDF
router.get("/generate/:userId/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    // Fetch user progress
    const progress = await UserCourseProgress.findOne({ userId, courseId });

    if (!progress || !progress.completed) {
      return res.status(400).json({ message: "Course not completed yet!" });
    }

    // Create certificate file path
    const certPath = path.join(__dirname, `../certificates/certificate_${userId}_${courseId}.pdf`);

    // Generate PDF
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(certPath));

    doc.fontSize(30).text("Certificate of Completion", { align: "center" });
    doc.moveDown();
    doc.fontSize(20).text(`This certifies that`, { align: "center" });
    doc.fontSize(25).text(`${userId}`, { align: "center" });
    doc.fontSize(18).text(`has successfully completed the course`, { align: "center" });
    doc.fontSize(20).text(`${courseId}`, { align: "center" });
    doc.fontSize(15).text(`Date: ${progress.completionDate.toDateString()}`, { align: "center" });

    doc.end();

    // Update progress with certificate URL
    progress.certificateUrl = `/certificates/certificate_${userId}_${courseId}.pdf`;
    await progress.save();

    res.status(200).json({ message: "Certificate generated!", url: progress.certificateUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
