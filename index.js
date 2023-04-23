const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/user")
const bookRoutes = require("./routes/book")

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection established"))
  .catch((err) => console.log(err));

app.use(cors())
app.use(express.json())

app.use("/api/users",userRoutes)
app.use("/api/books",bookRoutes)

app.listen(5000, () => {
  console.log("listening on port 5000");
});
