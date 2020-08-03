const Joi = require("joi");
const express = require("express");
const router = express.Router();
const veges = require("../../data");

router.use(express.json());


router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

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

router.get("/", (req, res) => {
    res.send(veges);
});

router.get("/:id", (req, res) => {
    const vege = veges.find((vege) => parseInt(req.params.id) === vege._id);
    if (!vege) return res.status(404).send("沒有你要找的菜ㄟ歹勢");
    res.send(vege);
});

router.post("/", (req, res) => {
    const { error } = validates(req.body);
    if (error) {
        const errMsg = error.details[0].message;
        res.status(400).send(errMsg);
        return;
    }

    const vege = {
        品名: req.body["品名"],
        市場: req.body["市場"],
        "平均(元 / 公斤)": req.body["平均(元 / 公斤)"],
        種類: req.body["種類"],
        日期: getDate(new Date()),
        _id: veges.length + 1,
    };
    veges.push(vege);
    res.send(vege);
});

router.put("/:id", (req, res) => {
    let vege = veges.find((vege) => parseInt(req.params.id) === vege._id);
    if (!vege) return res.status(404).send("沒有你要找的菜ㄟ歹勢");

    const { error } = validates(req.body);
    if (error) {
        const errMsg = error.details[0].message;
        res.status(400).send(errMsg);
        return;
    }

    const idx = veges.indexOf(vege);
    vege = { ...vege, ...req.body };
    veges[idx] = vege;
    res.send(vege);
});

router.delete("/:id", (req, res) => {
    let vege = veges.find((vege) => parseInt(req.params.id) === vege._id);
    if (!vege) return res.status(404).send("沒有你要找的菜ㄟ歹勢");

    const idx = veges.indexOf(vege);
    veges.splice(idx, 1);
    res.send(vege);
});

module.exports = router;