const express = require("express");
const morgan = require("morgan")
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const colors = require("colors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, ".", "public")));
app.use('/images', express.static(path.join(__dirname, "images")));

//Routes
const productRoutes = require("./routes/product");
const adminRoutes = require("./routes/admin");
const pageNotFound = require("./controllers/pageNotFound");
const userRoutes = require("./routes/user");
//middle wares
app.use(productRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use(pageNotFound);

app.use((error, req, res, next) => {
    // res.json({ error: "error" })
    console.log("error".red, error.message)
});

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(res => {
        app.listen(process.env.PORT || 8000, () => console.log("server running...".cyan.bold));
    })
    .catch(error => {
        console.log("error conncting to server")
    })
