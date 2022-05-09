const connection = require("../db.js");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const buildInsertQueryString = (entityName, entityType, url) => {
    const queryString = `INSERT INTO entity (entityName, entityType, url) 
        VALUES (${mysql.escape(entityName)}, ${mysql.escape(entityType)}, ${mysql.escape(url)})`;
    return queryString;
  };

router.get("/", (req, res) => {
    connection.query("SELECT * FROM entity", (err, results) => {
      if (err) {
        return res.send(err);
      }
  
      return res.json({
        entities: results,
      });
    });
  });

  module.exports = router;