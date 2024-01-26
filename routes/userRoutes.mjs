import express from "express";
import {validateUserToken} from "../helpers/validator/userToken.validator.mjs"
import authRoutes from "../controller/userController/index.mjs";

const router = express.Router()
const {registerUser, loginUser, currentUser }  = authRoutes;

router.post("/signup", registerUser)
router.post("/login", loginUser)
router.get("/current",validateUserToken, currentUser)

export default router;