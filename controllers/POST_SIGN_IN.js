const handleSignIn = (req, res, bcrypt, knex) => {
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
                res.status(400).json("Wrong Credentials");
            }
        })
        .catch(err => {
            res.status(400).json("Wrong Credentials");
        });
};

module.exports = {
    handleSignIn: handleSignIn
};
