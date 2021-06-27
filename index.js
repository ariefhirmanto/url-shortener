const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = "mongodb://ariefhirmanto:dzF0y3dMYyca9SkM@cluster0-shard-00-00.jnrxl.mongodb.net:27017,cluster0-shard-00-01.jnrxl.mongodb.net:27017,cluster0-shard-00-02.jnrxl.mongodb.net:27017/sederhanain?authSource=admin&replicaSet=atlas-doso54-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

var corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: true,
  maxAge: 600
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const db = require("./models");

  db.mongoose
  .connect(path, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

require('./routes/shortlink.route')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});