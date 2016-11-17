var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

var homePage = fs.readFileSync("public/html/1home.html");
app.get("/", function (req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(homePage);
});

var searchPage = fs.readFileSync("public/html/3search.html");
app.get("/search", function(req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(searchPage);
});

app.post("/search", function(req, res) {
    // TODO do something with POST
    console.log(req.body);
});

var eventPage = fs.readFileSync("public/html/5event_page.html");
app.get("/event", function(req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(eventPage);
});

var attendedEventPage = fs.readFileSync("public/html/6attended_events.html");
app.get("/attendedevents", function(req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(attendedEventPage);
});

var loginPage = fs.readFileSync("public/html/2userlogin.html");
app.get("/login", function(req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(loginPage);
});

var signupPage = fs.readFileSync("public/html/2usersignup.html");
app.get("/signup", function(req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(signupPage);
});

var resultsPage = fs.readFileSync("public/html/4results.html");
app.get("/results", function(req, res) {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.end(resultsPage);
});

app.get('/homepageimage.jpg', function(req, res){
  res.sendFile('/homepageimage.jpg', { root : __dirname});
});

app.get('/searchpageimage.jpg', function(req, res){
  res.sendFile('/searchpageimage.jpg', { root : __dirname});
});

var port = 80;
app.listen(port, function () {
    console.log("Listening on port: " + port);
});
