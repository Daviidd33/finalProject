const mongoose = require("mongoose");

const mongoCS =
    "mongodb+srv://dav07953:1234@cluster0.fufwarw.mongodb.net/cinemovies?retryWrites=true&w=majority";

function mongooseConnectDB() {
    // Connect to MongoDB
    mongoose
        .connect(mongoCS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.log(error));
}

module.exports = mongooseConnectDB;
