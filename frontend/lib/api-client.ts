
import { AIAnalysis } from "@/types/analysis";

export async function analyzeImage(
  image: File
): Promise<AIAnalysis> {
  const formData = new FormData();

  formData.append("image", image);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to analyze image"
    );
  }

  return data.data;
}

export async function chatWithAI(
  message: string,
  userId: string
): Promise<string> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          userId,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to generate response");
    }

    return data.reply;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
}

export async function submitReport(formData: any, token: string|null) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/analyze`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return response;
}





