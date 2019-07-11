import axios from "axios";

export function verifyAddress(address) {
  const url = "https://dev-api.shipwell.com/v2/locations/addresses/validate/";

  return axios
    .post(
      url,
      { formatted_address: address },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        }
      }
    )
    .then(res => {
      return res.data;
    })
    .catch(err => {
      const { error, error_description, non_field_errors } = err.response
        ? err.response.data
        : {};
      const updatedError = non_field_errors
        ? `(${error}: ${error_description}) ${non_field_errors}`
        : `${err}`;
      throw updatedError;
    });
}
