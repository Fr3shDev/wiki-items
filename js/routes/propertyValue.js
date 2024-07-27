const express = require("express");
const router = express.Router();
const { searchPropertyValue } = require('../controllers/propertyValueController');

router.get('/', searchPropertyValue);
module.exports = router