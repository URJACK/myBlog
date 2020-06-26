const express = require("express");
const app = express();
const LISTENPORT = 5000;

app.use(express.static('dist'))

app.get("/.*", function (req, res) {
    res.sendFile(__dirname + "./dist/index.html");
})

app.listen(LISTENPORT, () => {
    console.log("server started at port:" + LISTENPORT);
})