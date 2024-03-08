"use strict";
const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  destroy,
} = require("../controllers/bookController");

router
  .route("/")
  // ? get all books
  .get(list)
  // ? create a book
  .post(create);

router
  .route("/:id(\\d+)")
  // ? get single book
  .get(read)
  // ? update a book
  .put(update)
  .patch(update)
  // ? delete a book
  .delete(destroy);

module.exports = router;
