const express = require("express");
const app = express();

const veges = require("./data");

// console.log(veges[0]["_id"]);
app.get("/", (req, res) => {
    res.send("Hello");
})

app.get("/api/veges", (req, res) => {
    res.send(veges);
})

app.get("/api/veges/:id/", (req, res) => {
    const vege = veges.find(vege => parseInt(req.params.id) === vege._id);
    if (vege) res.send(vege);
    else res.status(404).send("沒有你要找的菜ㄟ歹勢");
});

app.post("/api/veges", (req, res) => {
    
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening from ${port}`))
// const http = require("http");

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write("<h1>hello</h1>");
//     res.end();
// })

// server.listen(3000);
