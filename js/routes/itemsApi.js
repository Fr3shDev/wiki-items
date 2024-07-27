const express = require("express");
const router = express.Router();
const { fetchItems, getEntities } = require("../controllers/SPARQLQueryDispatcher");

router.get("/", async (req, res) => {
	try {
		const items = await fetchItems();
    const ids = items.results.bindings
      .map((item) =>
			item.item.value.split("/").slice(-1),
    ).join('|');
    
    // Next call 
    const entities = await getEntities(ids)
    
		res.json(entities);
    
	} catch (error) {
		console.error("Error fetching items:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
