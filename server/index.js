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
  "mongodb+srv://spider-admin:Ryr8RQC9b8i8ED1E@spider.du1wb4c.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_CONN)
  .then(() =>
    app.listen(PORT, () => console.log(`Conectare reusita - port ${PORT}`))
  )
  .catch((error) => console.log(error));
