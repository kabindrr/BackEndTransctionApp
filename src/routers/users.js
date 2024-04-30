import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { compairPassword, hasPassword } from "../utils/bcryptjs.js";
const router = express.Router();

// router = {
//     get("/", (req,res)=>{}) ,
//     post(){}

// }

router.get("/", (req, res) => {
  try {
    res.json({
      status: "success",
      message: "todo get",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    req.body.password = hasPassword(req.body.password);
    const result = await insertUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Your new account has been created, You may login now",
        })
      : res.json({
          status: "error",
          message: "Unabel to process your request try again later",
        });
  } catch (error) {
    let code = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "User already Exists";
      code = 200;
    }
    res.status(code).json({
      status: "error",
      message: error.message,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user?._id) {
      //compare password
      const isMatched = compairPassword(password, user.password);

      if (isMatched) {
        //authorized
        return res.json({
          status: "success",
          message: "Logged in Successfully",
        });
      }
    }
    return res.json({
      status: "error",
      message: "Invalid Login Credentials",
    });
  } catch (error) {
    console.log(error);
    let code = 500;

    res.status(code).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
