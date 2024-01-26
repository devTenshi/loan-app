import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../../config/ENVconnection.config.mjs";


export const validateUserToken = async (req, res, next) => {
  try {
    let userID;

    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      userID = authHeader?.split(" ")[1];

      jwt.verify(userID, SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          res.status(401).json({ error: true });
          throw new Error("User is not authorized");
        }
        console.log(decoded)
        req.user = decoded.user;
        next(); 
      });
      if (!userID) res.status(401);
    throw new Error ("user is not authorized or token is not in the request") 
    };
    } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message || "very bad" });
  }
};
