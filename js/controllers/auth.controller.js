const axios = require("axios");
const config = require("../config");
const qs = require("qs");

const ACCESS_TOKEN =
  "https://meta.wikimedia.org/w/rest.php/oauth2/access_token";

const login = async (req, res) => {
  const { code } = req.params;

  const requestBody = {
    code: code,
    grant_type: "authorization_code",
    redirect_uri: config.callback,
    client_id: config.consumer_key,
    client_secret: config.consumer_secret,
  };

  try {
    const response = await axios.get(ACCESS_TOKEN, qs.stringify(requestBody), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Set Content-Type header
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
};
