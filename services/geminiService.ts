import { GoogleGenAI, Chat } from "@google/genai";
import { HOSPITAL_DATA } from "../data";
import { SYSTEM_PROMPT } from "../constants";

// ⚠️ Dán API key của anh vào đây ↓
const API_KEY = "AIzaSyChOM3l7JpimiucKBHDE4YUxEh1XuQcImE";

if (!API_KEY) {
  throw new Error("API_KEY is not set. Please add your Gemini API key.");
}

// Khởi tạo đối tượng AI
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Gộp hệ thống hướng dẫn và dữ liệu bệnh viện
const fullSystemPrompt = `${SYSTEM_PROMPT}\n\nDATA:\n${JSON.stringify(HOSPITAL_DATA, null, 2)}`;

// Hàm khởi tạo phiên chat mới
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: fullSystemPrompt,
    },
  });
};

// Hàm gửi tin nhắn và nhận phản hồi
export const sendMessageToChat = async (
  chat: Chat,
  userQuery: string
): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message: userQuery });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.";
  }
};
