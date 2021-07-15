const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

require("dotenv").config();

const users = require("./routes/api/users");
const tasks = require("./routes/api/tasks");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

// DB Config
const db = process.env.mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

require("./models/User");
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/tasks", tasks);

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
