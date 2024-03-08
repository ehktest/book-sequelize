"use strict";

const { Book } = require("../models/bookModel");

module.exports = {
  // ? get all books
  list: async (req, res, next) => {
    try {
      const data = await Book.findAndCountAll({});
      console.log("🔭 ~ list: ~ data ➡ ➡ ", data);

      res.status(200).json({
        error: false,
        result: data,
      });
    } catch (error) {
      res.errorStatusCode = 503;
      next(error);
    }
  },
  // ? get single book
  read: async (req, res, next) => {
    try {
      const data = await Book.findByPk(parseInt(req.params.id));

      res.status(200).json({
        error: false,
        result: data,
      });
    } catch (error) {
      res.errorStatusCode = 503;
      next(error);
    }
  },
  // ? create a book
  create: async (req, res, next) => {
    try {
      const data = await Book.create(req.body);

      res.status(201).json({
        error: false,
        // data: data.toJSON(),
        result: data.dataValues,
      });
    } catch (error) {
      res.errorStatusCode = 503;
      next(error);
    }
  },
  // ? update a book
  update: async (req, res, next) => {
    try {
      const data = await Book.update(req.body, {
        where: { id: req.params.id },
      });

      // 202 -> accecpted
      res.status(202).json({
        error: false,
        message: "Updated",
        body: req.body, // gonderilen veriyi goster
        result: data,
        new: await Book.findByPk(parseInt(req.params.id)), // guncellenmis veriyi goster
      });
    } catch (error) {
      res.errorStatusCode = 503;
      next(error);
    }
  },
  // ? delete a book
  destroy: async (req, res, next) => {
    try {
      const data = await Book.destroy({ where: { id: req.params.id } });

      if (data !== 0) {
        res.sendStatus(204);
      } else {
        res.errorStatusCode = 404;
        throw new Error("Not Found");
      }
    } catch (error) {
      res.errorStatusCode = 503;
      next(error);
    }
  },
};
