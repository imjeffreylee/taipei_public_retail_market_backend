const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const getDate = (date) => {
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) month = "0" + month;
    let today = date.getDate().toString();
    if (today.length < 2) today = "0" + today;
    return `${year}-${month}-${today}`;
};

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
        default: getDate(new Date()),
    },
});

const Vege = mongoose.model("veges", VegeSchema);
module.exports = Vege;