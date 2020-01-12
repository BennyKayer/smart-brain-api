const db = require("./mockedDb");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(db.users);
});

/*
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

app.post("/signin", (req, response) => {
    const { email, password } = req.body;

    let currentUser = null;
    // Find association
    db.login.forEach(user => {
        if (user.email === email) {
            currentUser = user;
        }
    });
    if (!currentUser) {
        response.status(400).json("user not found");
    }

    bcrypt.compare(password, currentUser.hash, (err, res) => {
        if (res) {
            response.json(currentUser);
        } else {
            response.status(400).json("No match sry");
        }
    });
});

// OLD
// app.post("/register", (req, res) => {
//     const newUser = {
//         id: db.users.length,
//         ...req.body,
//         entries: 0,
//         joined: new Date()
//     };

//     db.users.push(newUser);
//     res.json(db.users);
// });

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const newUser = {
        id: db.users.length,
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    };

    db.users.push(newUser);

    bcrypt.hash(password, null, null, (err, hash) => {
        db.login.push({
            id: db.login.length,
            hash: hash,
            email: email
        });
    });

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
