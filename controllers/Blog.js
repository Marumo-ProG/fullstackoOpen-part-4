const app = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

app.get("/info", (req, res) => {
  res.contentType("html");
  let d = new Date();
  res.send(
    "This is a blog api to display blogs available in the bloglist application"
  );
});
app.get("/", async (req, res) => {
  const data = await Blog.find({});
  res.json(data).status(200).end();
});

app.get("/:id", async (req, res) => {
  let id = req.params.id;
  data = await Blog.findById({ id });
  if (data) {
    res.json(data).status(200).end();
  } else {
    res.status(404).end();
  }
});

app.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.status(204).end();
});

app.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: body.author,
  };

  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });

  res.status(200).end();
});

app.post("/", async (req, res) => {
  let body = req.body;

  const user = await User.findById(body.userId);
  if (body.title && body.url) {
    res.status(201);
    let blog = new Blog({
      title: body.title,
      author: body.author,
      likes: body.likes ? body.likes : 0, // exercise 4.11
      url: body.url,
      user: user.id,
    });
    const data = await blog.save();
    user.notes = user.blogs.concat(data._id);
    await user.save();
    res.json(data).status(201).end();
  } else {
    res.status(400).end();
  }
});

module.exports = app;
