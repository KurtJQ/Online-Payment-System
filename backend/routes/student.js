import express from "express";
import db from "../db/connection.js";
import { Int32 } from "mongodb";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/", async (req, res) => {
  let collection = db.collection("students");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//New Student Registration
router.post("/new", async (req, res) => {
  try {
    let collection = db.collection("registrations");
    let newDocument = {
      name: {
        first: req.body.firstname,
        middle: req.body.middlename,
        last: req.body.lastname,
      },
      contactnum: req.body.contactnum,
      facebook: req.body.facebook,
      email: req.body.email,
      password: req.body.password,
      yearlevel: req.body.yearlevel,
      semester: req.body.semester,
      course: req.body.semester,
      documents: {
        PSA: req.body.psa,
        Form138: req.body.form138,
      },
      address: req.body.address,
      birthday: req.body.date,
      guardian: req.body.guardian,
      guardianContact: req.body.guardianContact,
      sex: req.body.sex,
    };
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (e) {
    res.status(500).send("Error Registering");
  }
});

//Profile Data
router.get("/profile-data", async (req, res) => {
  let collection = db.collection("students");
  let profileData = collection.findOne();
});

//Get Invoice
router.get("/invoice/:id", async (req, res) => {
  try {
    const collection = db.collection("payments");
    const query = { studentId: req.params.id };
    const invoice = await collection.find(query).toArray();
    res.send(invoice).status(200);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error retrieving invoice");
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = { email: email };
  let result;

  try {
    let collection = db.collection("students");
    let user = await collection.findOne(query);
    if (!user) {
      result = null;
      res.status(200).json(result);
      return;
    }
    const validation = await bcrypt.compare(password, user.password);
    if (!validation) {
      result = null;
      res.status(200).json(result);
      return;
    }

    result = {
      _studentId: user._studentId,
      fname: user.fname,
      mname: user.mname,
      lname: user.lname,
    };
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
