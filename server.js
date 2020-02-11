const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "51184c6a",
        database: "smart-brain"
    }
});

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const register = require("./controllers/REGISTER");
const signin = require("./controllers/SIGN_IN");
const profile = require("./controllers/PROFILE");
const image = require("./controllers/IMAGE");

app.get("/", (req, res) => {
    res.send(db.users);
});
app.post("/signin", (req, res) => signin.postSignIn(req, res, bcrypt, knex));
app.post("/register", (req, res) =>
    register.postRegister(req, res, knex, bcrypt)
);
app.get("/profile/:id", (req, res) => {
    profile.getProfile(req, res, knex);
});
app.put("/image", (req, res) => {
    image.putImage(req, res, knex);
});
app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res);
});
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 4200;
app.listen(port, () => {
    console.log("App is running");
});
