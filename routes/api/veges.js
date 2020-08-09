const express = require("express");
const router = express.Router();
const validateVegeInput = require("../../validation/veges");
const Vege = require("../../models/Vege");

router.use(express.json());

// get whole veges list
router.get("/", (req, res) => {
    Vege.find()
        .then(veges => res.json(veges))
        .catch(err => res.status(400).json(err));
});

// get a single vege
router.get("/:id", (req, res) => {
    Vege.findById(req.params.id)
        .then((vege) => res.json(vege))
        .catch(() => res.status(400).send("沒有你要找的菜ㄟ歹勢"));
});

// create a new vege
router.post("/", (req, res) => {
    const { errors, isValid } = validateVegeInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newVege = new Vege({
        品名: req.body.品名,
        市場: req.body.市場,
        "平均(元 / 公斤)": req.body["平均(元 / 公斤)"],
        種類: req.body.種類,
        日期: req.body.日期,
    });
    newVege.save()
        .then(vege => res.json(vege));
});

// update an existing vege
router.put("/:id", (req, res) => {
    const { errors, isValid } = validateVegeInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Vege.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            Vege.findById(req.params.id).then((vege) => {
                res.json(vege);
            });
        })
        .catch(() => res.status(400).send("沒有你要找的菜ㄟ歹勢"));
});

// remove a vege from the list
router.delete("/:id", (req, res) => {
    Vege.findByIdAndDelete(req.params.id)
        .then((vege) => res.json(vege))
        .catch(() => res.status(400).send("沒有你要找的菜ㄟ歹勢"));
});

//remove all
router.delete("/", (req, res) => {
    Vege.deleteMany()
        .then(() => res.send("All documents removed"));
});

module.exports = router;