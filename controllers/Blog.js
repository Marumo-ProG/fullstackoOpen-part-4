const app = require("express").Router();
const Blog = require("../models/Blog");

app.get("/info", (req, res) => {
  res.contentType("html");
  let d = new Date();
  res.send(
    "This is a blog api to display blogs available in the bloglist application"
  );
});
app.get("/", (req, res) => {
  Blog.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/:id", (req, res) => {
  let id = req.params.id;
  Blog.find({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/:id", (req, res) => {
  Blog.deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log("blog deleted from the database");
    })
    .catch((err) => {
      console.error(err);
    });
  res.status(204).end();
});

app.put("/:id", (req, res) => {
  const body = req.body;

  const blog = {
    content: body.content,
    important: body.important,
  };

  Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.post("/", (req, res) => {
  let body = req.body;
  if (body) {
    Blog.find({ title: body.title })
      .then((data) => {
        if (data.length > 0) {
          console.log("ERROR, blog exists in the Database");
          res.end();
        } else {
          res.status(201);
          let blog = new Blog({
            title: body.title,
            author: body.author,
            likes: body.likes,
            url: body.url,
          });
          blog
            .save()
            .then((data) => {
              res.json(data).status(201).end();
            })
            .catch((err) => {
              res.status(403).end();
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("error adding user... no data specified");
    res.status(401).end();
  }
});

module.exports = app;
