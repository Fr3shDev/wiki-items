const axios = require("axios");
const config = require("../config");

const querySPARQL = async (endpoint, query) => {
	const fullUrl = `${endpoint}?query=${encodeURIComponent(query)}`;
	try {
		const response = await axios.get(fullUrl, {
			headers: {
				Accept: "application/sparql-results+json",
			},
		});

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return response.data;
	} catch (error) {
		throw new Error(`Failed to fetch data: ${error.message}`);
	}
};

const queryWikidata = async (ids) => {
	const fullUrl = `${config.wikiDataUrl}?action=
	wbgetentities&format=json&ids=${ids}&languages=en&props=claims|labels|descriptions`;

	try {
		const response = await axios.get(fullUrl, {
			headers: {
				Accept: "application/sparql-results+json",
			},
		});

		if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return response.data;
	} catch (error) {
		throw new Error(`Failed to fetch data: ${error.message}`);
	}
};

const cleanWikidataEntity = (entity) => {
	// Extract the title and label
	const title = entity.id || "";
	const label = entity.labels?.en?.value || "";

	// Extract the description
	const description = entity.descriptions?.en?.value || "";

	// Extract the image URL (if available)
	let image = null;
	if (entity.claims?.P18) {
		const imageClaims = entity.claims.P18;
		if (imageClaims.length > 0) {
			image = imageClaims[0].mainsnak.datavalue.value;
		}
	}

	// Collect other claims
	const others = {};
	for (const prop in entity.claims) {
		if (prop !== "P18") {
			// Exclude the image property
			others[prop] = entity.claims[prop].map(
				(claim) => claim.mainsnak.datavalue.value,
			);
		}
	}

	return JSON.stringify({
		title,
		label,
		image,
		description,
		others,
	});
}

const fetchItems = async () => {
	return await querySPARQL(config.SPARKQLEndPointUrl, config.sparqlQuery);
};

const getEntities = async (ids) => {
	const qData = await queryWikidata(ids);
	return qData;
};

module.exports = { fetchItems, getEntities, cleanWikidataEntity };
