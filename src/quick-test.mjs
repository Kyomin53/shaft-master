import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function quickTest() {
  console.log("Starting Quick Gemini Test...");
  
  const googleProvider = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
  });

  try {
    console.log(`Testing Model: [gemini-2.0-flash]`);
    const { text } = await generateText({
      model: googleProvider('gemini-2.0-flash'),
      messages: [{ role: 'user', content: 'Say "READY"' }],
    });
    console.log(`✅ SUCCESS: ${text}`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ FAILED: ${error.message}`);
    process.exit(1);
  }
}

quickTest();
