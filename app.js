const express = require("express"),
  parser = require("body-parser"),
  mongoose = require("mongoose"),
  override = require("method-override"),
  sanitizer = require("express-sanitizer");
(app = express()), (port = 3000);

mongoose.connect(
  "mongodb://localhost:27017/restful_blog_app",
  { useNewUrlParser: true }
);

// APP CONFIG MIDDLEWARE

app.set("view engine", "ejs");
mongoose.set("useFindAndModify", false);
app.use(express.static("public"));
app.use(parser.urlencoded({ extended: true }));
app.use(sanitizer());
app.use(override("_method"));

// MONGOOSE SCHEMA && MODEL

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// title - string
// image - string
// body - string
// created - date

// ROUTES

// Initial route (root)
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Index route
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log("Error", err);
    } else {
      res.render("index", { blogs });
    }
  });
});

// New route
app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// Create route
app.post("/blogs", (req, res) => {
  // create a blog
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render("new");
    } else {
      // redirect to the index
      res.redirect("/blogs");
    }
  });
});

// Show route
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

// Edit route
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// Update route
app.put("/blogs/:id", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect(`/blogs/${req.params.id}`);
    }
  });
});

// Destroy (delete) route
app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) res.redirect("/blogs");
    else res.redirect("/blogs");
  });
});

// Listener

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
