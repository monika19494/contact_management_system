const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/v1/contact", require("./routes/v1/contact"));
const router = require("./routes/v1/contact");
app.listen(5000, () => console.log("server running at 5000"));