import User from "../../models/userModel.mjs";
import { comparePassword } from "../../helpers/bcrypt.mjs";
import {signJwt} from "../../helpers/jwt.mjs"
import errorHandler from "../../middleware/errorHandler.mjs"
import { log } from "console";

// @decription: Register a user
// @route POST /api/users/signup
// @access Public
const registerUser = async (req, res, next) => {
  try {
    // res.json({ message: "User account is created" });
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      res.status(400);
      throw new Error("All fields are Mandatory");
    }
    //check if an email has an already existing user in the mongo db
    const userAvailable = await User.findOne({ email });

    // set a validation error to let the user know the email is already in use
    if (userAvailable) {
      res.status(400);
      throw new Error("User is already registered!");
    }
    // if there is no registered user with the email, register a user in the db
    // First thing to do is Hashing the password,check userModel

    // Second: create a user
    const user = await User.create({ first_name, last_name, email, password });
    //  console.log(`User is created successfully: ${user}`);

    //making sure to send this user Info. excluding the password details.
    if (user) {
      res.status(201).json({ id: user._id });
    } else {
      res.status(400);
      throw new Error("User data is not valid!");
    }
  } catch (error) {
    log(error);
    res.status(400).json({ msg: error.message || "very bad" });
  }
};


// @decription: Login a user
// @route POST /api/users/login
// @access Public

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json("All fields are mandatory");
    }

    const user = await User.findOne({ email }).select( "+password" );
    if (!user) return res.status(401).json({ error: ' Invalid credentials' });
  
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: ' Invalid credentials' });
      
    const accessToken = await signJwt({ id: user._id, email: user.email })
    const { _doc: { password:hash, ...rest}} = user;
    // res.status(201).json({ message: "success", statusCode: 201, data: { accessToken, user: rest } });
    res.status(201).json({ data: {accessToken }});

  } catch (err) {
    log(err)
   return  errorHandler(err, req, res, next)
  }
}


// @decription: view current user Info
// @route GET /api/users/current
// @access Public
const currentUser = async (req, res) => {
  res.json(req.user);
};

export default {
  registerUser,
  loginUser,
  currentUser,
};

