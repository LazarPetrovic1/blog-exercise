const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/blog-demo",
  { useNewUrlParser: true }
);

// POST MODEL - title & content: has to be defined before the user, as it will be used there

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

// USER MODEL - email & name

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

const User = mongoose.model("User", userSchema);

// const newUser = new User({
//   email: "hermione@hogwarts.edu",
//   name: "Hermione Granger"
// });
//
// newUser.posts.push({
//   title: "How to brew Polyjuice potion",
//   content: "Just kidding. Go to Snape's class to learn it"
// });
//
// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// const newPost = new Post({
//   title: "Reflections on Apples",
//   content: "I don't like them all that much."
// });
//
// newPost.save((err, post) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({ name: "Hermione Granger" }, (err, user) => {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: "Three things I really hate",
      content: "Voldemort, Umbridge, Corruption"
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
