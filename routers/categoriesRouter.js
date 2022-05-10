const connection = require("../db.js");
const mysql = require("mysql");
const express = require("express");
const router = express.Router();

const buildInsertQueryString = (categoryName, confidence) => {
    const queryString = `INSERT INTO category (categoryName, confidence) 
        VALUES (${mysql.escape(categoryName)}, ${mysql.escape(confidence)})`;
    return queryString;
  };

router.get("/", (req, res) => {
    connection.query("SELECT * FROM category", (err, results) => {
      if (err) {
        return res.send(err);
      }
  
      return res.json({
        categories: results,
      });
    });
  });

  router.post("/", async (req, res) => {
    try {
      const { categories } = req.body;
      console.log(categories);
      if(categories){
        categories.forEach(category => {
          let confidence = category.confidence.toFixed(2);
          const queryString = buildInsertQueryString(category.categoryName, confidence);
      connection.query(queryString, (err, results) => {
          if (err) {
              return res.send(err);
          }
        });
      })
    }
      return res.status(200).json({message:"Categories saved"})
    } catch (error) {
        console.log(error);
        return res.send("Something went wrong");
    }
});

  module.exports = router;