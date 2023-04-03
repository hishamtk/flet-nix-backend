import mongoose from "mongoose";

const Schema = mongoose.Schema;

const analyticSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  linkId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Analytic", analyticSchema);
