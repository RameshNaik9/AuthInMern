require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// const buildPath = path.join(__dirname, '../client/build')

// app.use(express.static(buildPath))

// app.get("*", (req, res) => {
//   res.sendFile(path.join(buildPath, "index.html"));
// });

const buildPath = path.join(__dirname, 'build');

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
