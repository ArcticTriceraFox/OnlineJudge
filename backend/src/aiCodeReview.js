const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiCodeReview = async (code, language, problemTitle, problemDescription) => {
  const prompt = `You are an expert code reviewer. The user is attempting to solve the following problem:\n\nTitle: ${problemTitle}\nDescription: ${problemDescription}\n\nHere is their ${language} code:\n\n${code}\n\n- Is this code actually solving the above problem?\n- If not, what is it doing instead?\n- Is it correct for the intended problem?\n- What are possible issues or improvements?\nGive a clear, concise review.`;
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (err) {
    console.error("Gemini AI error:", err);
    return "AI review failed.";
  }
};

module.exports = { 
  aiCodeReview,
};