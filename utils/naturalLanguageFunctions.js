const language = require('@google-cloud/language');

const dotenv = require('dotenv')
dotenv.config()

const client = new language.LanguageServiceClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

async function detectEntities(text){
    try {
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };
       
        const [result] = await client.analyzeEntities({document: document});
        const entities = [];

        result.entities.forEach(entity => {
            entities.push({entityName:entity.name, entityType: entity.type, url: entity.metadata.wikipedia_url ? entity.metadata.wikipedia_url : ""});
        });
       
        return entities
    } catch (error) {
        console.log(error);
        return
    }
}

async function detectCategories(text){
    try {
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };
       
        const [classification] = await client.classifyText({document});
        const categories = []
        classification.categories.forEach(category => {
          categories.push({categoryName:category.name, confidence: category.confidence});
        });
        
        return categories
    } catch (error) {
        console.log(error);
        return
    }
}

module.exports = {detectEntities, detectCategories}