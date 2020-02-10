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
const register = require("./controllers/POST_REGISTER");
const signin = require("./controllers/POST_SIGN_IN");

/*
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

app.post("/signin", (req, res) => signin.handleSignIn(req, res, bcrypt, knex));

app.post("/register", (req, res) =>
    register.handleRegister(req, res, knex, bcrypt)
);

app.get("/profile/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    knex.select("*")
        .from("users")
        .where({
            id: id
        })
        .then(user => {
            // console.log(user[0]);
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json("User not found");
            }
        });
});

app.put("/image", (req, res) => {
    const id = req.body.id;
    knex("users")
        .where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then(entries => {
            // console.log(entries[0]);
            if (entries.length) {
                res.json(entries[0]);
            } else {
                res.status(400).json(
                    "Can't update entries of non-existant user"
                );
            }
        })
        .catch(err => {
            res.status(400).json("Unable to get entries");
        });
});

app.listen(4200, () => {
    console.log("App is running");
});
