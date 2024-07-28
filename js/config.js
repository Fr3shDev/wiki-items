var config = {};

config.session_secret = "generate some random value here";
config.consumer_key = "the consumer token value from your OAuth consumer registration";
config.consumer_secret = "the secret token value from your OAuth consumer registration";
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
