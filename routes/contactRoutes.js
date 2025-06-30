const express = require("express");
const router = express.Router();
const { handleContactMessage } = require("../controller/contactController");

router.post("/contact", handleContactMessage);

module.exports = router;
