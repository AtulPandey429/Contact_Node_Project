const express = require("express");

const dotenv = require("dotenv").config();
const connectdb = require("./config/dbConnection");
connectdb();
const errorHandler = require("./middelware/errorHandler");

const app = express();
app.use(express.json());

app.use("/api/contacts", require("./routes/conRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
