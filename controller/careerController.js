const path = require("path");
const { sendEnquiryEmail } = require("../utils/mailer");
const Career = require("../model/careerModel");

exports.submitCareerApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      qualification,
      experience,
    } = req.body;
    const skillsText = req.body['skills-text'];

    const resume = req.files['resume']?.[0]?.filename || '';
    const coverLetter = req.files['coverLetter']?.[0]?.filename || '';

    console.log("Received career application data:", req.body);
    console.log("Files:", { resume, coverLetter });

    const newApplication = new Career({
      name,
      email,
      qualification,
      experience,
      skillsText,
      resume,
      coverLetter,
    });

    console.log("Attempting to save application...");
    await newApplication.save();
    console.log("Application saved successfully.");

    const resumePath = path.join(__dirname, "../uploads", resume);
    const coverLetterPath = coverLetter ? path.join(__dirname, "../uploads", coverLetter) : null;

    await sendEnquiryEmail(
      {
        name,
        email,
        qualification,
        experience,
        'skills-text': skillsText,
      },
      resumePath,
      coverLetterPath
    );

    res.status(200).json({ message: "Application submitted and saved successfully!" });
  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({ message: "Failed to submit application" });
  }
};
