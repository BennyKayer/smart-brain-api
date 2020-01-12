const db = require("./mockedDb");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is working");
});

/*
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

app.post("/signin", (req, res) => {
    // he mentioned something about performance issues with variable checking and looping
    // keeping it for now
    if (
        req.body.email === db.users[0].email &&
        req.body.password === db.users[0].password
    ) {
        res.json("success");
    } else {
        res.status(400).json(
            `${req.body.email} =/= ${db.users[0].email} or ${req.body.password} =/= ${db.users[0].password}`
        );
    }
});

app.post("/register", (req, res) => {
    const newUser = {
        id: db.users.length,
        ...req.body,
        entries: 0,
        joined: new Date()
    };

    db.users.push(newUser);
    res.json(db.users);
});

app.get("/profile/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    let found = false;
    db.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json("not found");
    }
});

app.put("/image", (req, res) => {
    const id = req.body.id;
    let found = false;
    db.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json("not found");
    }
});

app.listen(4200, () => {
    console.log("App is running");
});
