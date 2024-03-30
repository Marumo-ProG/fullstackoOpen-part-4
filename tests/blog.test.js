const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/Blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

// const initialContacts = [
//   {
//     name: "Tracy",
//     number: "0715985514",
//   },
//   {
//     name: "Boss Lady",
//     number: "06319585651",
//   },
// ];

beforeEach(async () => {
  //   await Phone.deleteMany({});
  //   let phoneObject = new Phone(initialContacts[0]);
  //   await phoneObject.save();
  //   phoneObject = new Phone(initialContacts[1]);
  //   await phoneObject.save();
});

test("blogs returned are good", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs"); // getting the blogs to make sure the correct number of blogs is being returned
  assert.equal(response.body.length, 1);
});

after(async () => {
  await mongoose.connection.close();
});
