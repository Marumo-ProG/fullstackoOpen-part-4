const mongoose = require("mongoose");
const config = require("../utils/config");

const url = config.MONGO_URI;

const blogSchema = new mongoose.Schema({
  name: String,
  number: String,
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Blog", blogSchema);
