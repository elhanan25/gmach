const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },

  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },

  address: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
  payments: {
    type: String,
  },

  takemoney: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    address: Joi.string().min(6).max(255),
    phone: Joi.number(),
    takemoney: Joi.string().min(6).max(255),
    payments: Joi.string().min(6).max(255),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
