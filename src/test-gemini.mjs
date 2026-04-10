import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function test() {
  console.log("Starting Gemini API Test with retrieved model list...");
  
  // These are the models that appeared in our list_models check
  const MODEL_NAMES = [
    'gemini-flash-latest',
    'gemini-2.0-flash',
    'gemini-2.5-flash',
    'gemini-3-flash-preview'
  ];

  const version = 'v1beta'; // Most models in the list were checked against v1beta
  console.log(`=== Testing with API Version: [${version}] ===`);
  
  const googleProvider = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    baseURL: `https://generativelanguage.googleapis.com/${version}`,
  });

  for (const modelName of MODEL_NAMES) {
    try {
      console.log(`Testing Model ID: [${modelName}]`);
      
      const { text } = await generateText({
        model: googleProvider(modelName),
        messages: [{ role: 'user', content: 'Hi, can you respond with "Gemini [ModelName] is working!"?' }],
      });
      
      console.log(`✅ SUCCESS with [${modelName}]!`);
      console.log('Response:', text);
      process.exit(0);
    } catch (error) {
      console.error(`❌ FAILED with [${modelName}]:`, error.message);
    }
  }
  
  console.log("\nAll model identifiers failed.");
  process.exit(1);
}

test();
