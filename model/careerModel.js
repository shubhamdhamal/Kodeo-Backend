const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    skillsText: { type: String, required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Career", careerSchema);
