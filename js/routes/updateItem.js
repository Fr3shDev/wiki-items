const express = require("express");
const router = express.Router();
var config = require("../config");

const {
	updateWikidataItem,
	getCSRFToken,
} = require("../controllers/wikidataUpdateItem");

router.post("/update", updateWikidataItem);
router.get("/get-csrf", getCSRFToken);

module.exports = router;
