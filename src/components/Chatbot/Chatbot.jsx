import { useEffect, useRef, useState } from "react"
import ChatbotIcon from "./ChatbotIcon"
import ChatForm from "./ChatForm"
import ChatMessage from "./ChatMessage"
import { portfolioInfo } from "./chatbotConfig"
import { FaTimes, FaRobot } from "react-icons/fa"

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: portfolioInfo,
    },
  ])
  const [showChatbot, setShowChatbot] = useState(false)
  const chatBodyRef = useRef()

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ])
    }
    
    // Format history for Gemini API
    history = history.map(({ role, text }) => ({ 
      role, 
      parts: [{ text }] 
    }))

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      )

      const text = await response.text()
      const data = text ? JSON.parse(text) : null

      if (!response.ok) {
        throw new Error(data?.error?.message || "Something went wrong")
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim()
      updateHistory(apiResponseText)
    } catch (error) {
      updateHistory(error.message, true)
    }
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  })

  return (
    <div className={`chatbot-wrapper ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        id="chatbot-toggler"
      >
        <span className="robot-icon"><FaRobot /></span>
        <span className="close-icon"><FaTimes /></span>
      </button>

      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Adnan's Assistant</h2>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className="close-btn"
          >
            <FaTimes />
          </button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hello!👋🏻 I'm Adnan's Portfolio Assistant. <br />
              How can I help you today?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        
        {/* Chatbot Footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  )
}

export default Chatbot