const express = require("express");
const Joi = require("joi");
const app = express();

const veges = require("./data");

app.use(express.json());

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
    const schema = {
        "品名": Joi.string().required(),
        "市場": Joi.string().required(),
        "平均(元 / 公斤)": Joi.string().required(),
        "種類": Joi.string().required(),
    }
    const input = Joi.validate(req.body, schema);
    
    if (input.error) {
        const errMsg = input.error.details[0].message;
        res.status(400).send(errMsg);
        return;
    }

    const vege = {
        "品名": req.body["品名"],
        "市場": req.body["市場"],
        "平均(元 / 公斤)": req.body["平均(元 / 公斤)"],
        "種類": req.body["種類"],
        日期: new Date(),
        _id: veges.length + 1,
    };
    veges.push(vege);
    res.send(vege);
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
