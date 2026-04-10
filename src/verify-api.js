async function verifyRoute() {
  const url = "http://localhost:3000/api/chat";
  const body = {
    messages: [{ role: "user", content: "안녕" }]
  };

  console.log("Testing POST /api/chat...");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response starts with:", text.substring(0, 100));
    
    if (res.status === 200 && text.includes("시뮬레이션")) {
      console.log("SUCCESS: Mock fallback triggered correctly!");
    } else if (res.status === 200) {
      console.log("SUCCESS: Real AI responded!");
    } else {
      console.log("FAILED: Status not 200 or unexpected content.");
    }
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

verifyRoute();
