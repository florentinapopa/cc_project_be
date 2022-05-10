const express = require("express");
const router = express.Router();
const {detectLanguage, translateText} = require('../utils/translateFunctions')
const {LANGUAGE_ISO_CODE} = require("../utils/allowedLanguages");
const { detectEntities, detectCategories } = require("../utils/naturalLanguageFunctions")

router.get('/entities', async (req, res) =>{
    
    const {text, language} = req.query
  
    
    if(!text || !language){
        return res.status(400).send('Missing parameters')
    }

    let translationData = {};

        const originalText = await detectLanguage(text);
        translationData.originalLanguage = originalText[0]?.language;

        if(translationData.originalLanguage === LANGUAGE_ISO_CODE[language]){
            return res.status(406).json({message: "Language is the same, select another language to translate."})
        }

        const translatedText = await translateText(
            text,
            LANGUAGE_ISO_CODE[language]
        );
        translationData.translatedText = translatedText[0];
       
        const entities = await detectEntities(translationData.translatedText)
   
        return res.json({entities: entities})
   
})

router.get('/categories', async (req, res) =>{
    const {text} = req.query
    if(!text){
        return res.status(400).send('Missing parameters')
    }

    const originalText = await detectLanguage(text);
    const originalLanguage = originalText[0]?.language;

        if(originalLanguage !== LANGUAGE_ISO_CODE.ENGLISH){
            const translatedText = await translateText(
                text,
                LANGUAGE_ISO_CODE.ENGLISH
            );
            const categories = await detectCategories(translatedText)
             return res.json({categories})
        } else {
            const categories = await detectCategories(text)
             return res.json({categories})
        }   
})

module.exports = router
