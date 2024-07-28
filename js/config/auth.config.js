const MediaWikiStrategy = require("passport-mediawiki-oauth").OAuthStrategy;

passport.use(
  new MediaWikiStrategy(
    {
      consumerKey: config.consumer_key,
      consumerSecret: config.consumer_secret,
    },
    function (token, tokenSecret, profile, done) {
      profile.oauth = {
        consumer_key: config.consumer_key,
        consumer_secret: config.consumer_secret,
        token: token,
        token_secret: tokenSecret,
      };
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
