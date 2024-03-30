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

test("HTTP Post creates a new node and checking the number of blogs", async () => {
  // making sure that data is correct and being returned
  await api
    .post("/api/blogs")
    .send({
      title: "Lenny the ripper",
      author: "Tracy",
      url: "www.signaturesigns.com",
      likes: 10,
    })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // doing the post manually

  // checking if all the data being returned has the key id and not _id
  const response = await api.get("/api/blogs");
  const number = response.body.length;

  assert.equal(number, 2);
});

after(async () => {
  await mongoose.connection.close();
});
