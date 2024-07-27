const { default: axios } = require("axios");

const searchPropertyValue = async (req, res, next) => {
    const searchTerm = req.query.q;
    if (!searchTerm) { 
        return res.status(400).json({ message: 'Missing search term' });
    }

    try{
        const response = await axios.get('https://www.wikidata.org/w/api.php', {
        params: {
            action: 'wbsearchentities',
            format: 'json',
            language: 'en',
            search: searchTerm
        }
    });

    const results = response.data.search.map(item => ({
      id: item.id,
      label: item.label,
      description: item.description,
    }));

    res.json(results);
    } catch(error) {
        console.error('Error fetch data from WikiData API', error);
        next(error);
    }
} 
module.exports = { searchPropertyValue }