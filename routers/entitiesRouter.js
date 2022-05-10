const connection = require("../db.js");
const mysql = require("mysql");
const { detectLanguage, translateText, } = require("../utils/translateFunctions.js");
const { LANGUAGE_ISO_CODE } = require("../utils/allowedLanguages");
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

  router.post("/", async (req, res) => {
    try {
        const { entities } = req.body;
        if(entities){
          entities.forEach(entity => {
            const queryString = buildInsertQueryString(entity.entityName, entity.entityType, entity.url);
        connection.query(queryString, (err, results) => {
            if (err) {
                return res.send(err);
            }
          });
        })
      }
      return res.status(200).json({message:"Entities saved"})
    } catch (error) {
        console.log(error);
        return res.send("Something went wrong");
    }
});

  module.exports = router;