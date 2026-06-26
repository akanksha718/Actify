import axios from "axios";

const API_KEY = process.env.ROBOFLOW_API_KEY!;
const MODEL_ID = "civic-issues-lroee/3";

export async function analyzeImage(buffer: Buffer) {
  const base64 = buffer.toString("base64");

  const { data } = await axios.post(
    `https://serverless.roboflow.com/${MODEL_ID}`,
    base64,
    {
      params: {
        api_key: API_KEY,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
}