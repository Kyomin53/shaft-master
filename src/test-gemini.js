const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testKey() {
  const apiKey = "AIzaSyDWbNAmn_WtL0xhCrSGcBwx5sltpjREITQ";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    console.log("Checking available models...");
    // We can't easily ListModels from this SDK version without specific methods,
    // but we can try a simple generation with the most basic model.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello?");
    const response = await result.response;
    console.log("Success! Response text:", response.text());
  } catch (error) {
    console.error("Test failed!");
    console.error("Error message:", error.message);
    if (error.response) {
      console.error("Response data:", JSON.stringify(error.response, null, 2));
    }
  }
}

testKey();
