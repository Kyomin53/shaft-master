import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function listModels() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const version = 'v1';
  console.log(`Listing models with key [EXISTS] and version [${version}]`);
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`);
    const data = await response.json();
    if (data.error) {
      console.error("API Error JSON:", JSON.stringify(data.error, null, 2));
    } else {
      console.log(`Available Models in [${version}]:`);
      if (data.models) {
        data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
      } else {
        console.log("No models returned.");
      }
    }
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

listModels();
