const express = require("express");
const Joi = require("joi");
const app = express();
const veges = require("./data");

// middleware
app.use(express.json());

// validation
const validates = (vege) => {
    const schema = {
        "品名": Joi.string().required(),
        "市場": Joi.string().required(),
        "平均(元 / 公斤)": Joi.string().required(),
        "種類": Joi.string().required(),
    };
    return Joi.validate(vege, schema);
};

//get a new date string
const getDate = (date) => {
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) month = "0" + month;
    let today = date.getDate().toString();
    if (today.length < 2) today = "0" + today;
    return `${year}-${month}-${today}`;
}

// routes
app.get("/", (req, res) => {
    res.send("臺北市公有零售市場行情");
});

app.get("/api/veges", (req, res) => {
    res.send(veges);
});

app.get("/api/veges/:id/", (req, res) => {
    const vege = veges.find(vege => parseInt(req.params.id) === vege._id);
    if (!vege) return res.status(404).send("沒有你要找的菜ㄟ歹勢");
    res.send(vege);
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
        日期: getDate(new Date()),
        _id: veges.length + 1,
    };
    veges.push(vege);
    res.send(vege);
});

app.put("/api/veges/:id", (req, res) => {
    let vege = veges.find((vege) => parseInt(req.params.id) === vege._id);
    if (!vege) return res.status(404).send("沒有你要找的菜ㄟ歹勢");

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
    if (!vege) return res.status(404).send("沒有你要找的菜ㄟ歹勢");

    const idx = veges.indexOf(vege);
    veges.splice(idx, 1);
    res.send(vege);
})

// listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening from ${port}`))