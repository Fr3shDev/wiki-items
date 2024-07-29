var config = {};

config.session_secret = process.env.SESSION_SECRET;
config.consumer_key = process.env.MEDIAWIKI_CONSUMER_KEY;
config.consumer_secret = process.env.MEDIAWIKI_CONSUMER_SECRET;
config.callback = process.env.MEDIAWIKI_CALLBACK_URL;
config.SPARKQLEndPointUrl = "https://query.wikidata.org/sparql";
config.wikiDataUrl = "https://www.wikidata.org/w/api.php";
config.sparqlQuery = `#Items with a Wikispecies sitelink
    #illustrates sitelink selection, ";" notation
    #title: Items with a Wikispecies sitelink
    SELECT ?item WHERE {
        ?item wikibase:sitelinks [] .
        MINUS {?item wdt:P31 []}
        MINUS {?item wdt:P279 []}
        MINUS {?item wdt:P361 []}
        MINUS {?item wdt:P527 []}
    }
    LIMIT 25`;

module.exports = config;
