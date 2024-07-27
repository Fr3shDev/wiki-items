class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `#Items with a Wikispecies sitelink
#illustrates sitelink selection, ";" notation
#title: Items with a Wikispecies sitelink
SELECT ?item WHERE {
    ?item wikibase:sitelinks [] .
  MINUS {?item wdt:P31 []}
  MINUS {?item wdt:P279 []}
  MINUS {?item wdt:P361 []}
  MINUS {?item wdt:P527 []}
}
LIMIT 25
`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( console.log );
