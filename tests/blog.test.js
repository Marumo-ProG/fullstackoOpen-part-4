const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs returned are good", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  // getting the blogs to make sure the correct number of blogs is being returned
  const response = await api.get("/api/blogs");
  assert.equal(response.body.length, 1);
});

test("unique identifier named id as oposed to _id", async () => {
  // making sure that data is correct and being returned
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  // checking if all the data being returned has the key id and not _id
  const response = await api.get("/api/blogs");
  const number = response.body.filter((blog) => blog.id).length;

  assert.equal(number, 1);
});

after(async () => {
  await mongoose.connection.close();
});
