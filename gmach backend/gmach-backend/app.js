const users = require("./routes/users");
const pleasers = require("./routes/pleasers");
const express = require("express");
const auth = require("./routes/auth");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/gmach", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
    
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/gmach/users", users);
app.use("/gmach/auth", auth);
app.use("/gmach/pleasers", pleasers)


const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
