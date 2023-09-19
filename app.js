const express = require('express');
const cors = require("cors");
const req = require('express/lib/request');
const res = require('express/lib/response');
const contactRouter = require("./app/routes/contact.route")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);

module.exports = app;