import mongoose from "mongoose";
import keys from "./keys.js"


const db = () => {
  mongoose
    .connect(keys.db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((db) => {
      console.log(
        `DB connected, Host : ${db.connections[0].host} , Port: ${db.connections[0].port}, Database: ${db.connections[0].name} `
      );
    })
    .catch((err) => {
      throw err;
    });
};

export default db;
