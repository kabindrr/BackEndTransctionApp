import express from "express";
import { insertUser } from "../models/user/UserModel.js";
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
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
