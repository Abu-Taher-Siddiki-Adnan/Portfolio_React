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
  const [isTyping, setIsTyping] = useState(false)
  const chatBodyRef = useRef()

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "..."),
        { role: "model", text, isError },
      ])
      setIsTyping(false)
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
      
      // Force shorter responses if needed
      let finalResponse = apiResponseText
      if (finalResponse.split(/[.!?]+/).length > 3) {
        // Take only first 2-3 sentences
        const sentences = finalResponse.split(/[.!?]+/)
        finalResponse = sentences.slice(0, 2).join('. ') + '.'
      }
      
      updateHistory(finalResponse)
    } catch (error) {
      updateHistory("Hmm, let me check on that. Could you ask again?", true)
    }
  }

  const handleQuickQuestion = (question) => {
    // Add slight typing delay for human feel
    setChatHistory((history) => [
      ...history,
      { role: "user", text: question },
    ])

    setIsTyping(true)
    
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "..." },
      ])
      
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `[AS ADNAN'S ASSISTANT - BE HUMAN-LIKE] 
          User asked: "${question}"
          
          Respond naturally in 1-3 sentences max. Be conversational. End with a question.`,
        },
      ])
    }, 600)
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  })

  // Quick questions that sound human
  const quickQuestions = [
    "What do you charge for app development?",
    "Are you available for new projects?",
    "Can I see your Flutter work?",
    "How do I contact Adnan?"
  ]

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
            <div className="welcome-message assistant-welcome">
              <p className="message-text">
                👋 Hey there! I'm Adnan's assistant.<br/>
                Need help with projects, rates, or just want to chat about his work?
              </p>
              <div className="quick-responses">
                {quickQuestions.map((q, idx) => (
                  <button 
                    key={idx} 
                    className="quick-response-btn" 
                    onClick={() => handleQuickQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <ChatbotIcon />
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
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