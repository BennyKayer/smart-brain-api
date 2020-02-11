const getProfile = (req, res, knex) => {
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
};

module.exports = {
    getProfile: getProfile
};
