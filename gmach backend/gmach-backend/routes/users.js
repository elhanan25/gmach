const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

router.get("/all", async (req, res) => {
  try {
    const userslist = await User.find();
    res.json(userslist.filter((user) => user.isAdmin != true));
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({
      message: "User already registered.",
    });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(user);
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove({ _id: req.params.id });
  if (!user) {
    return res.status(400).send({
      message: "user not found!",
    });
  }
  res.send(user);
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!user)
      return res.status(404).send({
        message: "The user with the given ID was not found.",
      });

    user = await User.findOne({ _id: req.params.id });
    res.send(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
