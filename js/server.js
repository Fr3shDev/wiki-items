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

var express = require ("express");
var session = require("express-session");
var passport = require("passport");
var MediaWikiStrategy = require("passport-mediawiki-oauth").OAuthStrategy;
var config = require("./config");

const { updateWikidataItem, getCSRFToken } = require('./wikidata.js');


require("dotenv").config();
const notFound = require("./exception-handlers/not-found");
const errorHandlerMiddleware = require("./exception-handlers/error-handler");
var express = require("express");
const cors = require("cors");

const listofitemsRouter = require("./routes/itemsApi");
const searchRoute = require("./routes/propertyValue");
const authRoute = require("./routes/auth.routes");


const {
	queryDispatcher,
	sparqlQuery,
} = require("./controllers/SPARQLQueryDispatcher");

var propertiesData = require('./utils/data')
var app = express();


app.use(express.static(__dirname + "/public/views"));


app.use('/property-value', searchRoute);


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static(__dirname + "/public/views"));

app.use("/items", listofitemsRouter);
app.use("/property-value", searchRoute);
app.use("/api/v1/auth", authRoute);

app.use(notFound);
app.use(errorHandlerMiddleware); //make sure very routes is above this middleware




app.listen(process.env.PORT || 8000, function () {
  console.log("Node.js app listening on port 8000!");

});
