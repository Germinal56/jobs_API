const postmanToOpenApi = require('postman-to-openapi')
const path = require('path');

const postmanCollection = path.join(__dirname, 'swagger.json');
const outputFile = path.join(__dirname, 'swagger.yml');

// Convert to an async function directly
console.log(`Current working directory: ${process.cwd()}`);
async function conversion(postmanCollection, outputFile) {
    try {
        const result = await postmanToOpenApi(postmanCollection, outputFile, { defaultTag: 'General' });
        // Outputting the result to the console
        console.log(`OpenAPI specs: ${result}`);
    } catch (err) { // Consider refining the error type if possible
        console.error(err);
    }
}

// To execute the function, you just call it with the necessary arguments
conversion(postmanCollection, outputFile);
