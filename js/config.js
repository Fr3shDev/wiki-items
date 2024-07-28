var config = {};

config.session_secret = process.env.SESSION_SECRET;
config.consumer_key = process.env.MEDIAWIKI_CONSUMER_KEY;
config.consumer_secret = process.env.MEDIAWIKI_CONSUMER_SECRET;
config.callback = process.env.MEDIAWIKI_CALLBACK_URL;

module.exports = config;
