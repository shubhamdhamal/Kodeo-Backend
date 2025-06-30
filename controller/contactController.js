const { sendContactEmail } = require("../utils/mailer");
const Contact = require("../model/contactModel");

exports.handleContactMessage = async (req, res) => {
  const { name, email, contact, subject, message } = req.body;

  if (!name || !email || !contact || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      contact,
      subject,
      message,
    });

    await newContact.save();
    await sendContactEmail({ name, email, contact, subject, message });
    res.status(200).json({ message: "Message sent and saved successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Failed to send or save message" });
  }
};
