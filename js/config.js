var config = {};

config.session_secret = "generate some random value here";
config.consumer_key = "the consumer token value from your OAuth consumer registration";
config.consumer_secret = "the secret token value from your OAuth consumer registration";
config.SPARKQLEndPointUrl = "https://query.wikidata.org/sparql";

module.exports = config;
