const clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "352da46f49bc408bba5c0afcd1b12186"
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json("Unable to work with API"));
};

const putImage = (req, res, knex) => {
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
};

module.exports = {
    putImage: putImage,
    handleApiCall: handleApiCall
};
