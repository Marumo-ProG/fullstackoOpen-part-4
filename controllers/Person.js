const app = require("express").Router();
const Contact = require("../models/Phone");

app.get("/info", (req, res) => {
  res.contentType("html");
  let d = new Date();
  res.send(
    "<div> <h3>Phone book has info for " +
      persons.length +
      " people</h3> <br> <br> " +
      d +
      " </div>"
  );
});
app.get("/", (req, res) => {
  Contact.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/:id", (req, res) => {
  let id = req.params.id;
  Contact.find({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/:id", (req, res) => {
  Contact.deleteOne({ _id: req.params.id })
    .then((data) => {
      console.log("user deleted from the database");
    })
    .catch((err) => {
      console.error(err);
    });
  res.status(204).end();
});

app.put("/:id", (req, res) => {
  const body = req.body;

  const contact = {
    content: body.content,
    important: body.important,
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.post("/", (req, res) => {
  let body = req.body;
  if (body.name && body.number) {
    Contact.find({ name: body.name })
      .then((data) => {
        if (data.length > 0) {
          console.log("ERROR, User exists in the Database");
          res.end();
        } else {
          let contact = new Contact({ name: body.name, number: body.number });
          contact
            .save()
            .then((data) => {
              console.log(
                "Added " + body.name + " " + body.number + " to the phonebook"
              );
              res.end();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("error adding user... no name or number specified");
    res.status(401);
  }

  res.end();
});

module.exports = app;
