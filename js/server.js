/*

 This file is part of the Toolforge Node.js tutorial

 Copyright (C) 2018 Srishti Sethi and contributors

 This program is free software: you can redistribute it and/or modify it
 under the terms of the GNU General Public License as published by the Free
 Software Foundation, either version 3 of the License, or (at your option)
 any later version.

 This program is distributed in the hope that it will be useful, but WITHOUT
 ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 more details.

 You should have received a copy of the GNU General Public License along
 with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
const notFound = require("./exception-handlers/not-found");
const errorHandlerMiddleware = require("./exception-handlers/error-handler");
var express = require("express");
var session = require("express-session");
var passport = require("passport");
var config = require("./config");
var propertiesData = require("./utils/data");
var app = express();
var router = express.Router();

const searchRoute = require("./routes/propertyValue");

app.set("views", __dirname + "/public/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/views"));

app.use(
  session({
    secret: config.session_secret,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.initialize());
app.use(passport.session());
app.use("/", router);

app.use("/property-value", searchRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT || 5000, function () {
  console.log("Node.js app listening on port 8000!");
});
