const express = require("express")
const contacts = require("../controllers/contact.controller");
// const { route } = require("../../app");


const router = express.Router();

router.route("/")
    .post(contacts.create)
    .get(contacts.findALL)
    .delete(contacts.deleteALL);

router.route("/favorite")
    .get(contacts.findALLFavorite);

router.route("/id")
    .get(contacts.findOne)
    .put(contacts.update)
    .delete(contacts.delete);

module.exports = router;