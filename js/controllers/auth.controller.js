router.get("/", function (req, res) {
  res.render("index", {
    user: req && req.session && req.session.user,
    url: req.baseUrl,
  });
});

router.get("/login", function (req, res) {
  res.redirect(req.baseUrl + "/oauth-callback");
});

router.get("/oauth-callback", function (req, res, next) {
  passport.authenticate("mediawiki", function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect(req.baseUrl + "/login");
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      req.session.user = user;
      res.redirect(req.baseUrl + "/");
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  delete req.session.user;
  res.redirect(req.baseUrl + "/");
});
router.get("/properties", function (req, res) {
  try {
    res.json(propertiesData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});
