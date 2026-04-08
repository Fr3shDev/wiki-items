const express = require("express");
const router = express.Router();
const {
	fetchItems,
	getEntities,
	cleanWikidataEntity,
} = require("../controllers/SPARQLQueryDispatcher");

router.get("/", async (req, res) => {
	try {
		const items = await fetchItems();

		console.log(items);

		const ids = items.results.bindings
			.map((item) => item.item.value.split("/").slice(-1))
			.join("|");

		// Next call
		const data = await getEntities(ids);

		res.json(data);

		const entities = data;
		const cleanedData = Object.fromEntries(
			Object.entries(entities).map(([qid, entity]) => [
				qid,
				cleanWikidataEntity(entity),
			]),
		);

		console.log("====================================");
		console.log(cleanedData);
		console.log("====================================");
		
	} catch (error) {
		console.error("Error fetching items:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
