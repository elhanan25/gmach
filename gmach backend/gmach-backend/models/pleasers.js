const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const pleasSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  notes: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  email: {
type: String,
required:true,
minlength:2,
maxlength:255
  },

  status: {
    type: String,
     minlength: 2,
    maxlength: 255,
    default:'no permit',
      },
  createdAt: { type: Date, default: Date.now },
});



const Please = mongoose.model("Please", pleasSchema);

function validatePlease(please) {
  const schema = Joi.object({
    text: Joi.string().min(2).max(255).required(),
    notes: Joi.string().min(6).max(255).required(),
    status: Joi.string().min(6).max(255),
    email: Joi.string().min(2).max(30).email().required(),
   
    
  });

  return schema.validate(please);
}

exports.Please = Please;
exports.validate = validatePlease;
