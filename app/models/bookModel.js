"use strict";

const { Sequelize, DataTypes } = require("sequelize");

// creating sequelize instance for sqlite3
const sequelize = new Sequelize("sqlite:./db.sqlite3");

// creating table
const Book = sequelize.define(
  "book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
        isTitle(value) {
          // if (/^(?=.*[^a-zA-Z0-9'"]).*$/.test(value)) {
          if (!/^[a-zA-Z0-9"][a-zA-Z0-9'"\s]{2,}[a-zA-Z0-9"]$/.test(value)) {
            throw new Error(
              "Title name can only contain quotes, letters, digits and whitespaces in range of 4 to 20 in total, must start and end with a letter, digit or quote."
            );
          }
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
        isAuthor(value) {
          // if (/^(?=.*[^a-zA-Z0-9'"]).*$/.test(value)) {
          if (!/^[a-zA-Z][a-zA-Z\s]{2,}[a-zA-Z]$/.test(value)) {
            throw new Error(
              "Author name can only contain letters and whitespaces in range of 4 to 20 in total, must start and end with a letter."
            );
          }
        },
      },
    },
    ISBN: {
      type: DataTypes.STRING,
      validate: {
        isISBN(value) {
          if (value !== null) {
            if (![10, 13].includes(value.replaceAll("-", "").length)) {
              throw new Error("ISBN must be in 10 or 13 digits length.");
            }
          }

          // if (value !== null && /^\d[\d-]+\d$/.test(value)) {
          if (!/^\d{1,3}-?\d{1,3}-?\d{1,5}-?\d{1,3}-?\d{1}$/.test(value)) {
            throw new Error(
              "ISBN can only contain dashes and digits and need to be valid."
            );
          }
        },
      },
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        isGenre(value) {
          // if (/^(?=.*[^a-zA-Z0-9'"]).*$/.test(value)) {
          if (
            value !== null &&
            !/^[a-zA-Z][a-zA-Z\s-]{2,}[a-zA-Z]$/.test(value)
          ) {
            throw new Error(
              "Genre can only contain letters, dashes and whitespaces, must start and end with a letter."
            );
          }
        },
      },
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      validate: {
        isYear(value) {
          const currentYear = new Date().getFullYear();
          if (value !== null && (value < 1500 || value > currentYear)) {
            throw new Error("Year must be positive and valid.");
          }
        },
      },
    },
    image: {
      type: DataTypes.TEXT,
      validate: {
        len: [4, 100],
      },
    },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = { Book, sequelize };
