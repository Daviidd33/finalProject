const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnectDB = require("./utils/mongo");

const cors = require('cors');
const app = express();
mongooseConnectDB()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", require("./routes/index"));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));