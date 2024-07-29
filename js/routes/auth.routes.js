const express = require("express");
const { login, getAccessToken } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", login);
router.post("/access-token", getAccessToken);
module.exports = router;
