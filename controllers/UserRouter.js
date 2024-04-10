const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username && password && username.length >= 3 && password.length >= 3) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser).end();
  } else {
    response
      .status(400)
      .json({
        error:
          "Please provide username and password with at least 3 digits each",
      })
      .end();
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  userId = request.params.id;

  // fetching the user
  const user = await User.findById(userId)
  response.json(user)
})

module.exports = usersRouter;
