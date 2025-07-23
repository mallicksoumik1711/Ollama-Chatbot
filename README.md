# 🤖 Ollama-Based Chatbot (Gemma 1B)

This is a full-stack chatbot application that uses [Ollama](https://ollama.com/) with the `gemma:1b` LLM for local AI-powered chat. It includes a React frontend (Vite), a Node.js + Express backend, and MongoDB for storing chat history.

---

## 🧠 Features

- Chat with a locally running `gemma:1b` model via Ollama
- Streamed responses like ChatGPT
- Chat history stored in MongoDB
- "New Chat" feature with auto-generated name
- Fully responsive UI

---

## 🛠 Tech Stack

| Layer      | Tech                                 |
|------------|--------------------------------------|
| Frontend   | React (Vite), Tailwind CSS           |
| Backend    | Node.js, Express.js, Axios           |
| Database   | MongoDB (Mongoose)                   |
| LLM        | Ollama (`gemma:1b`)                  |

---

## 📁 Project Structure

ollama-chatbot/
├── ollama-chatbot-backend/
│ ├── routes/chat.js
│ ├── models/Chat.js, Message.js
│ ├── app.js
│ └── package.json
├── ollama-chatbot-frontend/
│ ├── src/
│ │ ├── components/ChatSidebar.jsx, ChatWindow.jsx
│ │ ├── App.jsx, main.jsx
│ │ └── services/api.js
│ └── package.json
├── README.md


---

## 🚀 How to Run Locally

### 1. Clone the Repository

git clone https://github.com/mallicksoumik1711/Ollama-Chatbot.git
cd Ollama-Chatbot

Install & Run Backend
   
Navigate to backend directory:

2. cd ollama-chatbot-backend
   npm install

3. Create a .env file:

   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ollama-chatbot
   OLLAMA_API_URL=http://localhost:11434/api/chat

4. Start the backend
   npm app.js
Make sure MongoDB is running on your system.

---

Install & Run Frontend

Navigate to frontend directory:

5. cd ollama-chatbot-frontend
   npm insta
   npm run dev

---

Setup and run Ollama

You can install Ollama for your OS here:
 👉 https://ollama.com/download
 📹 For quick guidance, watch this 2-minute video on how to install and run Ollama:
 👉 [How to Install Ollama (YouTube/Drive Link)]
 Ollam install flow video = https://drive.google.com/file/d/1tlijbf2kIVu4BNR1uk7rZbGsQ5JM5Faz/view

 Once installed, you can pull the required model using:
bash
ollama pull gemma:1b

Then start testing it with:
bash
ollama run gemma:1b

---

✅ Assumptions / Notes
Ollama server must be running locally on http://localhost:11434

MongoDB must be running on your system

CORS is enabled in backend for local dev

Only one user is supported (no auth yet)
