import express from "express";
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
router.post("/", (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "todo post",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
