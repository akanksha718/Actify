import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

/* -------------------------------------------------------------------------- */
/*                                  CONTEXT                                   */
/* -------------------------------------------------------------------------- */

type UserContext = {
  name: string | null;
  email: string;
  xp: number;
  level: number;
  reports: {
    category: string;
    status: string;
    severity: string;
    department: string;
    address: string;
    confidence: number;
  }[];
};

function buildContext(user: UserContext) {
  const totalReports = user.reports.length;

  const openReports = user.reports.filter(
    (r) => r.status === "OPEN"
  ).length;

  const inProgressReports = user.reports.filter(
    (r) => r.status === "IN_PROGRESS"
  ).length;

  const fixedReports = user.reports.filter(
    (r) => r.status === "FIXED"
  ).length;

  return `
=========================
USER PROFILE
=========================

Name: ${user.name ?? "Unknown"}
Email: ${user.email}

XP: ${user.xp}
Level: ${user.level}

=========================
REPORT STATISTICS
=========================

Total Reports: ${totalReports}
Open Reports: ${openReports}
In Progress Reports: ${inProgressReports}
Fixed Reports: ${fixedReports}

=========================
RECENT REPORTS
=========================

${
  totalReports === 0
    ? "No reports submitted yet."
    : user.reports
        .map(
          (report, index) => `
Report ${index + 1}

Category: ${report.category}
Status: ${report.status}
Severity: ${report.severity}
Department: ${report.department}
Address: ${report.address}
Confidence: ${report.confidence}
`
        )
        .join("\n")
}
`;
}

/* -------------------------------------------------------------------------- */
/*                                   CHAT                                     */
/* -------------------------------------------------------------------------- */

export async function ChatWithAi(
  message: string,
  user: UserContext
) {
  try {
    const context = buildContext(user);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
You are Actify AI, the intelligent assistant for the Actify civic issue reporting platform.

You have access to the user's account information and report history.

Always use the provided user context whenever it is relevant.

Never make up reports that are not listed.

If information is missing, politely say you don't have that information.

------------------------------------
USER CONTEXT
------------------------------------

${context}

------------------------------------
YOUR RESPONSIBILITIES
------------------------------------

- Help users report civic issues.
- Explain report statuses.
- Explain user XP and level.
- Tell users how many reports they have submitted.
- Explain departments responsible for issues.
- Summarize previous reports.
- Suggest the correct category.
- Keep answers short and professional.

If the question is unrelated to civic issues or Actify, answer:

"I'm designed to help with civic issues and Actify. Please ask me something related to reporting or tracking community issues."

------------------------------------
USER QUESTION
------------------------------------

${message}
`,
    });

    return (
      response.text?.trim() ??
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
}

/* -------------------------------------------------------------------------- */
/*                              IMAGE ANALYSIS                                */
/* -------------------------------------------------------------------------- */

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

Analyze the uploaded image.

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

Estimate:

Severity:
- LOW
- MEDIUM
- HIGH

Confidence:
0.0 - 1.0

Return ONLY valid JSON.

{
  "category": "",
  "confidence": 0.95,
  "severity": "",
  "description": "",
  "recommendedDepartment": ""
}

No markdown.
No explanation.
Only JSON.
`,
        },
      ],
    });

    const text = response.text;

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini Image Error:", error);
    throw error;
  }
}