const express = require("express");
const Joi = require("joi");
const app = express();
const veges = require("./data");
const { indexOf } = require("./data");
app.use(express.json());

const validates = (vege) => {
    const schema = {
        "品名": Joi.string().required(),
        "市場": Joi.string().required(),
        "平均(元 / 公斤)": Joi.string().required(),
        "種類": Joi.string().required(),
    };
    return Joi.validate(vege, schema);
};

app.get("/", (req, res) => {
    res.send("臺北市公有零售市場行情");
});

app.get("/api/veges", (req, res) => {
    res.send(veges);
});

app.get("/api/veges/:id/", (req, res) => {
    // console.log(req);
    const vege = veges.find(vege => parseInt(req.params.id) === vege._id);
    if (vege) res.send(vege);
    else res.status(404).send("沒有你要找的菜ㄟ歹勢");
});

app.post("/api/veges", (req, res) => {
    const { error } = validates(req.body);
    if (error) {
        const errMsg = error.details[0].message;
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
});

app.put("/api/veges/:id", (req, res) => {
    let vege = veges.find((vege) => parseInt(req.params.id) === vege._id);
    if (!vege) res.status(404).send("沒有你要找的菜ㄟ歹勢");

    const { error } = validates(req.body);
    if (error) {
        const errMsg = error.details[0].message;
        res.status(400).send(errMsg);
        return;
    }

    const idx = veges.indexOf(vege);
    vege = {...vege, ...req.body};
    veges[idx] = vege;
    res.send(vege);
});

app.delete("/api/veges/:id", (req, res) => {
    let vege = veges.find((vege) => parseInt(req.params.id) === vege._id);
    if (!vege) res.status(404).send("沒有你要找的菜ㄟ歹勢");

    const idx = veges.indexOf(vege);
    veges.splice(idx, 1);
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
