const mongoose = require("mongoose");

// POST MODEL - title & content: has to be defined before the user, as it will be used there

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

/* const Post = mongoose.model("Post", postSchema); */

module.exports = mongoose.model("Post", postSchema);
