import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = db.collection("students");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//Profile Data

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields must  be filled");
    }

    let collection = db.collection("students");
    let user = await collection.findOne({ email });
    if (!email) {
      throw Error("User does not exist ");
    }
    if (password != user.password) {
      throw Error("Password is incorrect");
    }

    res.status(200).json({ user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
