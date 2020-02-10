const handleRegister = (req, res, knex, bcrypt) => {
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
};

module.exports = {
    handleRegister: handleRegister
};
