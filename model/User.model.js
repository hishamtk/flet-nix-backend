import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email Already Exist"],
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Enter correct email address",
    ],
  },
  name: {
    type: String,
    unique: [true, "Username Already Exist"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdOn: {
    type: Date,
  },
  age: {
    type: String,
    required: true
  },

  isFlagged: {
    type: Boolean,
    default: false,
  },

  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
