const mongoose = require("mongoose");
const express = require("express");
const db = require("./config/keys").mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((err) => console.log(err));

const app = express();
const vegesRouter = require("./routes/api/veges");

// middleware
app.use(express.json());
app.use("/api/veges", vegesRouter);

app.get("/", (req, res) => {
    res.send("臺北市公有零售市場行情");
});

// listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening from ${port}`))