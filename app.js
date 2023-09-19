const express = require('express');
const cors = require("cors");
const req = require('express/lib/request');
const res = require('express/lib/response');
const contactRouter = require("./app/routes/contact.route")
const ApiError = require("./app/api-error")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);

//handle 404 response
app.use((req, res, next) =>{
    return next(new ApiError(404, "resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error || "Internal Server Error",
    });
});

module.exports = app;