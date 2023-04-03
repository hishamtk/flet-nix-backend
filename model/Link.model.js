import mongoose from "mongoose";

const Schema = mongoose.Schema;

// link model type property to identify from genral link to social link.

const linkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Link", linkSchema);
