const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateVegeInput(data) {
    let errors = {};
    data.品名 = validText(data.品名) ? data.品名 : "";
    data.市場 = validText(data.市場) ? data.市場 : "";
    data["平均(元 / 公斤)"] = validText(data["平均(元 / 公斤)"]) ? data["平均(元 / 公斤)"] : "";
    data.種類 = validText(data.種類) ? data.種類 : "";
    data.日期 = validText(data.日期) ? data.日期 : "";

    if (Validator.isEmpty(data.品名)) errors.品名 = "請輸入品名";
    if (Validator.isEmpty(data.市場)) errors.市場 = "請輸入市場";
    if (Validator.isEmpty(data["平均(元 / 公斤)"])) errors["平均(元 / 公斤)"] = "請輸入平均(元 / 公斤)";
    if (Validator.isEmpty(data.種類)) errors.種類 = "請輸入種類";
    if (Validator.isEmpty(data.日期)) errors.日期 = "請輸入日期";

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};