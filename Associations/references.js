const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/blog-demo_2",
  { useNewUrlParser: true }
);

// post module
const Post = require("./models/post");

// user module
const User = require("./models/user");

Post.create(
  {
    title: "SAAAAAAY NIGGER",
    content: "NIGGER"
  },
  (err, post) => {
    User.findOne({ email: "qwe@qwe.qwe" }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        foundUser.posts.push(post);
        foundUser.save((err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
);

// Find user
User.findOne({ email: "qwe@qwe.qwe" })
  .populate("posts")
  .exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
    }
  });
// Find all posts for that user

// User.create({
//   email: "qwe@qwe.qwe",
//   name: "Qwe Qwe"
// });
