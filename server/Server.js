const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const myRoute = require("./routes/myRoute");
const fileRoutes = require("./routes/fileRoute")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use("/api", myRoute);
app.use('/api/files', fileRoutes);
app.use("/", (req, res) => {
  res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Home Page</title>
        </head>
        <body>
        <h3>Reachout at: ritesh.singh.19a@gmail.com</h3>
        </body>
        </html>`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.listen(PORT, (error) => {
  if (error) console.log(error + "unable to listen to port");
  else console.log(`listening to port ${PORT}`);
});
