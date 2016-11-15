var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

var homePage = fs.readFileSync("home.html");
app.get("/", function (req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(homePage);
});

var searchPage = fs.readFileSync("public/html/search.html");
app.get("/search", function(req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(searchPage);
});

app.post("/search", function(req, res) {
    // TODO do something with POST
    console.log(req.body);
});

var eventPage = fs.readFileSync("public/html/event.html");
app.get("/event", function(req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(eventPage);
});

var port = 8000;
app.listen(port, function () {
    console.log("Listening on port: " + port);
});