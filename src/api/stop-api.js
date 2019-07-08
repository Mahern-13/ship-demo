const fetch = require("node-fetch");

export function verifyAddress(address) {
  const url = "https://dev-api.shipwell.com/v2/locations/addresses/validate/";

  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ formatted_address: address }),
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        throw `${response.error}${response.error_description && ":"} ${
          response.error_description
        }`;
      }
      return response;
    });
}
