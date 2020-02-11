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

// app.post("/register", (req, res) => {
//     const { name, email, password } = req.body;

//     // Without db version
//     // const newUser = {
//     //     id: db.users.length,
//     //     name: name,
//     //     email: email,
//     //     entries: 0,
//     //     joined: new Date()
//     // };

//     // db.users.push(newUser);
// bcrypt.hash(password, null, null, (err, hash) => {
//     db.login.push({
//         id: db.login.length,
//         hash: hash,
//         email: email
//     });
// });
//     // Without db version
//     // res.json(db.users);
//     // res.json(newUser);
// });

// app.get("/profile/:id", (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     // Without db version
//     // let found = false;
//     // db.users.forEach(user => {
//     //     if (user.id === id) {
//     //         found = true;
//     //         return res.json(user);
//     //     }
//     // });
//     // if (!found) {
//     //     res.status(400).json("not found");
//     // }

// });

// app.put("/image", (req, res) => {
//     const id = req.body.id;
//     let found = false;
//     db.users.forEach(user => {
//         if (user.id === id) {
//             found = true;
//             user.entries++;
//             return res.json(user.entries);
//         }
//     });
//     if (!found) {
//         res.status(400).json("not found");
//     }
// });

// app.listen(4200, () => {
//     console.log("App is running");
// });

// app.post("/signin", (req, response) => {
//     const { email, password } = req.body;

//     let currentUser = null;
//     // Find association
//     db.login.forEach(user => {
//         if (user.email === email) {
//             currentUser = user;
//         }
//     });
//     if (!currentUser) {
//         response.status(400).json("user not found");
//     }

//     bcrypt.compare(password, currentUser.hash, (err, res) => {
//         if (res) {
//             response.json(currentUser);
//         } else {
//             response.status(400).json("No match sry");
//         }
//     });
// });

// const db = require("./mockedDb");

// Show all users
// knex.select("*")
//     .from("users")
//     .then(data => {
//         console.log(data);
//     });

// app.get("/", (req, res) => {
//     res.send(db.users);
// });

// Local connection
// const knex = require("knex")({
//     client: "pg",
//     connection: {
//         host: "127.0.0.1",
//         user: "postgres",
//         password: "51184c6a",
//         database: "smart-brain"
//     }
// });
