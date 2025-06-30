const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// For instructor application
const path = require("path");

const sendEnquiryEmail = async (data, resumePath, coverLetterPath) => {
  const mailOptions = {
    from: `"Kodeo Careers" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_TO,
    subject: `New Career Application from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <img src="cid:companylogo" alt="Kodeo Logo" style="width: 150px; margin-bottom: 20px;" />

        <h2 style="color: #333;">New Career Application</h2>
        <ul style="padding-left: 0; list-style: none; color: #555;">
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Qualification:</strong> ${data.qualification}</li>
          <li><strong>Experience:</strong> ${data.experience}</li>
          <li><strong>Skill Description:</strong> ${data["skills-text"]}</li>
        </ul>

        <hr style="margin: 30px 0;" />

        <footer style="font-size: 13px; color: #888; text-align: center;">
          <p><strong>Kodeo Software Technology</strong></p>
          <p>123 Tech Park, Pune, Maharashtra, India</p>
          <p>Email: careers@kodeo.in | Phone: +91 98765 43210</p>
        </footer>
      </div>
    `,
    attachments: [
      {
        filename: resumePath.split("/").pop(),
        path: resumePath,
      },
      coverLetterPath && {
        filename: coverLetterPath.split("/").pop(),
        path: coverLetterPath,
      },
      {
        filename: "logo.png",
        path: path.join(__dirname, "../assets/logo.png"),
        cid: "companylogo", // referenced in the img src
      },
    ].filter(Boolean),
  };

  return transporter.sendMail(mailOptions);
};


// 🆕 For contact form
const sendContactEmail = async ({ name, email, contact, subject, message }) => {
  const mailOptions = {
    from: `"Website Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_TO,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <img src="cid:companylogo" alt="Kodeo Logo" style="width: 150px; margin-bottom: 20px;" />

        <h2 style="color: #333;">New Contact Request</h2>
        <ul style="padding-left: 0; list-style: none; color: #555;">
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Contact Number:</strong> ${contact}</li>
          <li><strong>Subject:</strong> ${subject}</li>
          <li><strong>Message:</strong><br>${message}</li>
        </ul>

        <hr style="margin: 30px 0;" />

        <footer style="font-size: 13px; color: #888; text-align: center;">
          <p><strong>Kodeo Software Technology</strong></p>
          <p>123 Tech Park, Pune, Maharashtra, India</p>
          <p>Email: info@kodeo.in | Phone: +91 98765 43210</p>
        </footer>
      </div>
    `,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../assets/logo.png"),
        cid: "companylogo",
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};


// ✅ Export both
module.exports = {
  sendEnquiryEmail,
  sendContactEmail,
};
