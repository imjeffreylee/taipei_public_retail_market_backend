const mongoose = require("mongoose");
const express = require("express");
const db = require("./config/keys").mongoURI;
const app = express();
const vegesRouter = require("./routes/api/veges");
const Vege = require("./models/Vege");
const request = require("request");
const URL = "https://data.taipei/api/v1/dataset/f4f80730-df59-44f9-bfb8-32c136b1ae68?scope=resourceAquire";

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.log(err));

// middleware
app.use(express.json());

// routes
app.use("/api/veges", vegesRouter);

const fetchData = () => {
    Vege.deleteMany().then(() => console.log("Data is now up to date"));
    request(URL + "&limit=2", { json: true }, (err, resp, body) => {
        if (err) return console.log(err);
        let data = body.result.results;

        for (const vege of data) {
            let trimmed = JSON.parse(
                JSON.stringify(vege).replace(/"\s+|\s+"/g, '"')
            );
            const newVege = new Vege({
                品名: trimmed.品名,
                市場: trimmed.市場,
                "平均(元 / 公斤)": trimmed["平均(元 / 公斤)"],
                種類: trimmed.種類,
                日期: trimmed.日期,
            });

            newVege
                .save()
                .catch((err) => console.log(err));
        }
    });
};

fetchData();

setInterval(fetchData, 1000 * 60 * 60);

// listener
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`))