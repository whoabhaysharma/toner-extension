const { GoogleGenerativeAI } = require("@google/generative-ai");

const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('API_KEY is not set in the environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

const MODEL = "gemini-1.5-flash"
const INSTRUCTION = "When provided with a sentence or text followed by a pair of coordinates in square brackets (e.g., [x,y]), convert the text according to the specified tone and style as determined by the coordinates. The graph is divided into four quadrants:Top (y = 1): ProfessionalBottom (y = -1): InformalRight (x = 1): ExpandedLeft (x = -1): ConciseThe coordinates [x,y] will range from -1 to 1 and can include decimal values.Example:[1,1]: Convert the text to be both professional and expanded.[-1,1]: Convert the text to be professional and concise.[1,-1]: Convert the text to be informal and expanded.[-1,-1]: Convert the text to be both informal and concise.The AI should interpret the values to adjust the tone and length accordingly. If the coordinates fall between extremes (e.g., [0.5, 0.5]), the text should moderately balance the respective qualities (e.g., somewhat professional and somewhat expanded)."

const model = genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: INSTRUCTION,
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const createChatSession = () => {
    return model.startChat({
        generationConfig,
        history: [],
    });
}

const sendMessage = async (text) => {
    const chatSession = createChatSession();
    const result = await chatSession.sendMessage(text);
    return result.response.text();
}

module.exports = {
    sendMessage,
}