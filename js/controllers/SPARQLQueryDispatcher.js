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

const fetchItems = async () => {
	return await querySPARQL(config.SPARKQLEndPointUrl, config.sparqlQuery);
};

const getEntities = async (ids) => {
	const qData = await queryWikidata(ids);
	return qData;
};

module.exports = { fetchItems, getEntities };
