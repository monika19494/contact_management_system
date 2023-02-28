const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/contact", require("./routes/api/contact"));
const router = require("./routes/api/contact");
app.listen(5000, () => console.log("server running at 5000"));