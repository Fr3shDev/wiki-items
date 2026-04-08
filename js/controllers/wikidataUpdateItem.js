const config = require('../config');

// const fetch = require('node-fetch');
const getFetch = async () => {
  const { default: fetch } = await import('node-fetch');
  return fetch;
};

const fetch = getFetch();

async function updateWikidataItem(itemId, propertyId, value) {
  const apiUrl = config.wikiDataUrl;
  const csrfToken = await getCSRFToken();

  const claim = {
    id: `${itemId}$5627445f-43cb-ed6d-3adb-760e85bd17ee`,
    type: 'claim',
    mainsnak: {
      snaktype: 'value',
      property: propertyId,
      datavalue: {
        value,
        type: typeof value === 'string' ? 'string' : 'unknown'
      }
    }
  };

  const requestBody = new URLSearchParams({
    action: 'wbsetclaim',
    claim: JSON.stringify(claim),
    summary: 'Updating property value',
    token: csrfToken,
    format: 'json'
  });

  const response = await (await fetch)(apiUrl, {
    method: 'POST',
    body: requestBody
  });

  const data = await response.json();

  if (response.ok) {
    console.log('Claim updated successfully:', data);
  } else {
    console.error('Error updating claim:', data);
  }
}

async function getCSRFToken() {
  const apiUrl = config.wikiDataUrl;
  const requestBody = new URLSearchParams({
    action: 'query',
    meta: 'tokens',
    format: 'json'
  });

  const response = await (await fetch)(apiUrl, {
    method: 'POST',
    body: requestBody
  });

  const data = await response.json();
  return data.query.tokens.csrftoken;
}

// Example usage
updateWikidataItem('Q4115189', 'P1', 'City');


