const express = require("express");
const router = express.Router();

router.all("/", (req, res, next) => {
  next();
});

router.post("/", (req, res) => {
  next();
});

module.exports = router;
