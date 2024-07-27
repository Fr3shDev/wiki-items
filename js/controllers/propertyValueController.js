const axios = require("axios");

const searchPropertyValue = async (req, res, next) => {
    const searchTerm = req.query.search;
    console.log("Search Term:", searchTerm); // This should log the actual search term
    if (!searchTerm) { 
        return res.status(400).json({ message: 'Missing search term' });
    }

    try {
        const response = await axios.get('https://www.wikidata.org/w/api.php', {
            params: {
                action: 'wbsearchentities',
                format: 'json',
                language: 'en',
                search: searchTerm // Use the searchTerm variable directly
            }
        });

        const results = response.data.search.map(item => ({
            id: item.id,
            label: item.label,
            description: item.description,
        }));

        res.json(results);
    } catch (error) {
        console.error('Error fetching data from WikiData API', error);
        next(error);
    }
}

module.exports = { searchPropertyValue };
