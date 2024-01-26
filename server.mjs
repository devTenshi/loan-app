import express from "express";
import { PORT } from './config/ENVconnection.config.mjs';
import connectDb from "./config/DBconnection.config.mjs"
import bodyParser from "body-parser";
import errorHandler from "./middleware/errorHandler.mjs";
import userAuthRoutes from "./routes/userRoutes.mjs"

connectDb();
const app = express();
const port =  PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userAuthRoutes);
app.use(errorHandler);
app.use("*", (req, res) => res.status(400).json({ "message": "invalid route , try again" }));

app.listen(port, () =>
    console.log(`server is running on ${port}`)
)