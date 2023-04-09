const mongoose = require("mongoose");

const mongoLocalCS = "mongodb://localhost:27017/cinemovies?retryWrites=true&w=majority"
const mongoCloudCS = "mongodb+srv://dav07953:1234@cluster0.fufwarw.mongodb.net/cinemovies?retryWrites=true&w=majority";

function mongooseConnectDB() {
    // Connect to MongoDB
    mongoose
        .connect(mongoCloudCS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.log(error));
}

module.exports = mongooseConnectDB;
