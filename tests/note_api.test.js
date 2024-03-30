const { test, after, beforeEach } = require("node:test");
const Phone = require("../models/Phone");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const initialContacts = [
  {
    name: "Tracy",
    number: "0715985514",
  },
  {
    name: "Boss Lady",
    number: "06319585651",
  },
];

beforeEach(async () => {
  await Phone.deleteMany({});
  let phoneObject = new Phone(initialContacts[0]);
  await phoneObject.save();
  phoneObject = new Phone(initialContacts[1]);
  await phoneObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/persons")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
