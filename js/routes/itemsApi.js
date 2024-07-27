const express = require("express");
const router = express.Router();
const { fetchItems } = require("../controllers/SPARQLQueryDispatcher");

router.get("/", function (req, res) {
  console.log("we are here at /items");

  try {
    return fetchItems();
	} catch (error) {
		console.error("Error fetching items:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
