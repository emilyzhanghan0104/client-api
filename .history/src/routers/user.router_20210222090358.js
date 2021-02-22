const express = require("express");
const router = express.Router();

router.all("/", (req, res, next) => {
  next();
});

router.post("/", (req, res) => {
  const { password } = req.body;
});

module.exports = router;
