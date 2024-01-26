import * as dotenv from "dotenv";
dotenv.config();

const { MONGO_CONNECTION_STRING, PORT, SECRET_ACCESS_TOKEN } = process.env;

export { MONGO_CONNECTION_STRING, PORT, SECRET_ACCESS_TOKEN };