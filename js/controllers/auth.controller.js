const axios = require("axios");
const config = require("../config");
const qs = require("qs");
const asyncHandler = require("../middleware/async-handler");

const ACCESS_TOKEN_URL =
  "https://meta.wikimedia.org/w/rest.php/oauth2/access_token";

const login = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const data = {
    grant_type: "authorization_code",
    code: code,
    client_id: config.consumer_key,
    client_secret: config.consumer_secret,
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const response = await axios.post(ACCESS_TOKEN_URL, data, {
    headers,
  });

  res.status(200).json(response.data);
});

module.exports = {
  login,
};
