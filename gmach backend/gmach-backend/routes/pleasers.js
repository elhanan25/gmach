const express = require("express");
const { Please, validate } = require("../models/pleasers");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");

router.get("/all", async (req, res) => {
  
  try {
    const pleasers = await Please.find();
    res.json(pleasers);
  } catch (e) {
    res.status(400).json(e);
  }
});


router.get("/email/:email", async (req, res) => {
  
  try {
    const pleasers = await Please.find({email: req.params.email});
    res.json(pleasers);
  } catch (e) {
    res.status(400).json(e);
  }
});




router.get("/:id", async (req, res) => {
   const please = await Please.findOne({
    _id: req.params.id,
  });
  if (!please)
    return res.status(404).send({message:"The please with the given ID was not found."});
  res.send(please);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
 try {
    
  if (error) return res.status(400).send(error.details[0].message);

  let please = new Please(req.body);
  await please.save();
  res.send({please});
 } catch (e) {
    res.status(400).json(e);
  }
  
});

router.delete("/:id", async (req, res) => {
  const please = await Please.findByIdAndRemove({ _id: req.params.id });
  if (!please) {
    return res.status(400).send({message: "please not found!"});
  }
  res.send(please);
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});
    
    let please = await Please.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!please)
      return res.status(404).send({message: "The please with the given ID was not found."});

    please = await Please.findOne({ _id: req.params.id });
    res.send(please);
});

module.exports = router;
