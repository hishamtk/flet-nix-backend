import mongoose from "mongoose";

const Schema = mongoose.Schema;
const movieSchema = new Schema({
  show_id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Movie", "TV Show"],
  },
  title: {
    type: String,
  },
  director: {
    type: String,
  },
  country: {
    type: String,
  },
  release_year: {
    type: String,
  },
  date_added: {
    type: Date,
  },
  rating:{
    type:String
  },
  duration:{
    type:String
  },
  listed_in: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Movie", movieSchema);
