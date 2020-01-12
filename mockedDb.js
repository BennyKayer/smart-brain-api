const mockedDb = {
    users: [
        {
            id: 0,
            name: "John",
            email: "john@gmail.com",
            entries: 0,
            joined: new Date()
        },
        {
            id: 1,
            name: "Pawel",
            email: "pawlo97.pb@gmail.com",
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: "987",
            hash: "",
            email: "john@gmail.com"
        }
    ]
};

module.exports = mockedDb;
