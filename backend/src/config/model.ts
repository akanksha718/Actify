import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function analyzeImage(imageBuffer: Buffer) {
  try {
    const imageBase64 = imageBuffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64,
          },
        },
        {
          text: `
You are an AI assistant for a civic issue reporting application.

Analyze the uploaded road image.

Detect ONLY one primary issue.

Possible categories:
- Pothole
- Garbage
- Waterlogging
- Broken Road
- Broken Streetlight
- Open Manhole
- Fallen Tree
- Damaged Footpath
- Damaged Traffic Signal
- Illegal Dumping
- No Issue

Estimate severity:
Low
Medium
High

Estimate confidence between 0 and 1.

Return ONLY valid JSON.

{
  "category":"",
  "confidence":0.95,
  "severity":"",
  "description":"",
  "recommendedDepartment":""
}

Do not return markdown.
Do not explain.
Only output JSON.
`,
        },
      ],
    });

    const text = response.text;

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    // Remove markdown if Gemini wraps JSON in ```json
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error(err);
    throw err;
  }
}