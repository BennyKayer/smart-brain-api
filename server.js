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

/*
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

app.post("/signin", (req, res) => {
    knex.select("email", "hash")
        .where("email", "=", req.body.email)
        .from("login")
        .then(data => {
            //console.log(data[0]);
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return knex
                    .select("*")
                    .from("users")
                    .where("email", "=", req.body.email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => {
                        res.status(400).json("Unable to get user");
                    });
            } else {
                res.status(400).json("Wrond Credentials");
            }
        })
        .catch(err => {
            res.status(400).json("Wrong Credentials");
        });
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password);

    // Transaction
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into("login")
            .returning("email")
            .then(logEmail => {
                return trx("users")
                    .returning("*")
                    .insert({
                        name: name,
                        email: logEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        // console.log(user[0]);
                        res.json(user[0]);
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    }).catch(error => {
        res.status(400).json("User already exists");
    });
});

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
