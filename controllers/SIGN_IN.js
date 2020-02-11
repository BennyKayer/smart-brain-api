const postSignIn = (req, res, bcrypt, knex) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("Blank Fields");
    }

    knex.select("email", "hash")
        .where("email", "=", email)
        .from("login")
        .then(data => {
            //console.log(data[0]);
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return knex
                    .select("*")
                    .from("users")
                    .where("email", "=", email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => {
                        res.status(400).json("Unable to get user");
                    });
            } else {
                res.status(400).json("Wrong Credentials");
            }
        })
        .catch(err => {
            res.status(400).json("Wrong Credentials");
        });
};

module.exports = {
    postSignIn: postSignIn
};
