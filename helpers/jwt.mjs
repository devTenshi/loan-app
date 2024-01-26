import { SECRET_ACCESS_TOKEN } from "../config/ENVconnection.config.mjs";
import jwt from "jsonwebtoken";

 export const signJwt = async (payload) => jwt.sign( { user: payload }, SECRET_ACCESS_TOKEN, { expiresIn: "5m" });

