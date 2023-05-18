import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//connectare la baza de date
const PORT = process.env.PORT || 5000;
const DB_CONN =
  "mongodb+srv://korall-admin:ObJcxO4rTu8lxHCO@korall.2swvddt.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_CONN)
  .then(() => app.listen(PORT, () => console.log(`Server port: ${PORT}`)))
  .catch((error) => console.log(error));
