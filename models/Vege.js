const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VegeSchema = new Schema({
    品名: {
        type: String,
        required: true,
    },
    市場: {
        type: String,
        required: true,
    },
    "平均(元 / 公斤)": {
        type: String,
        required: true,
    },
    種類: {
        type: String,
        required: true,
    },
    日期: {
        type: String,
        required: true,
    },
});

const Vege = mongoose.model("veges", VegeSchema);
module.exports = Vege;