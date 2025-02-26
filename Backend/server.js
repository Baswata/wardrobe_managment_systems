const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const clothesRoutes = require("./Routes/clothes");
const authRoutes = require("./Routes/auth");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/clothes", clothesRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
});