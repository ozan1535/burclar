import express from "express";
import cors from "cors";
import horoscopes from "./routes/horoscopes.js";
import notFound from "./middleware/notFound.js";

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", horoscopes);

app.use(notFound);

app.listen(port);
