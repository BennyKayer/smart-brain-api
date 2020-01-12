const mockedDb = {
    users: [
        {
            id: 0,
            name: "John",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: 1,
            name: "Pawel",
            email: "pawlo97.pb@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        }
    ]
};

module.exports = mockedDb;
