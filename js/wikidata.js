// const fetch = require('node-fetch');
const getFetch = async () => {
  const { default: fetch } = await import('node-fetch');
  return fetch;
};

const fetch = getFetch();




// Function to get CSRF token using the access token
async function getCSRFToken(accessToken) {
  const apiUrl = 'https://www.wikidata.org/w/api.php';
  const requestBody = new URLSearchParams({
    action: 'query',
    meta: 'tokens',
    format: 'json'
  });

  const response = await axios.post(apiUrl, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.data;
  return data.query.tokens.csrftoken;
}

// Function to update a Wikidata item
async function updateWikidataItem(itemId, propertyId, value, accessToken) {
  const csrfToken = await getCSRFToken(accessToken);
  const apiUrl = 'https://www.wikidata.org/w/api.php';

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

  const response = await axios.post(apiUrl, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.data;

  if (response.status === 200) {
    console.log('Claim updated successfully:', data);
  } else {
    console.error('Error updating claim:', data);
  }
}

// Example usage
(async () => {
  const accessToken = req.session.accessToken; // Assuming you're using express-session
  await updateWikidataItem('Q4115189', 'P1', 'City', accessToken);
})();




// async function updateWikidataItem(itemId, propertyId, value) {
//   const apiUrl = 'https://www.wikidata.org/w/api.php';
//   const csrfToken = await getCSRFToken();

//   const claim = {
//     id: `${itemId}$5627445f-43cb-ed6d-3adb-760e85bd17ee`,
//     type: 'claim',
//     mainsnak: {
//       snaktype: 'value',
//       property: propertyId,
//       datavalue: {
//         value,
//         type: typeof value === 'string' ? 'string' : 'unknown'
//       }
//     }
//   };

//   const requestBody = new URLSearchParams({
//     action: 'wbsetclaim',
//     claim: JSON.stringify(claim),
//     summary: 'Updating property value',
//     token: csrfToken,
//     format: 'json'
//   });

//   const response = await (await fetch)(apiUrl, {
//     method: 'POST',
//     body: requestBody
//   });

//   const data = await response.json();

//   if (response.ok) {
//     console.log('Claim updated successfully:', data);
//   } else {
//     console.error('Error updating claim:', data);
//   }
// }

// async function getCSRFToken() {
//   const apiUrl = 'https://www.wikidata.org/w/api.php';
//   const requestBody = new URLSearchParams({
//     action: 'query',
//     meta: 'tokens',
//     format: 'json'
//   });

//   const response = await (await fetch)(apiUrl, {
//     method: 'POST',
//     body: requestBody
//   });

//   const data = await response.json();
//   return data.query.tokens.csrftoken;
// }

// // Example usage
// updateWikidataItem('Q4115189', 'P1', 'City');


