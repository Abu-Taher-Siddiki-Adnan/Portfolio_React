import { useRef } from "react"

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef()
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const userMessage = inputRef.current.value.trim()
    if (!userMessage) return
    
    inputRef.current.value = ""
    
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ])

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "..." },
      ])
      
      // Short, direct prompt for human-like responses
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `[AS ADNAN'S ASSISTANT - BE HUMAN-LIKE] 
          User said: "${userMessage}"
          
          Respond naturally in 1-3 sentences max. Be conversational. End with a question or suggestion. Don't sound like AI.`,
        },
      ])
    }, 400) // Shorter delay
  }

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        className="message-input"
        required
      />
      <button type="submit">↑</button>
    </form>
  )
}

export default ChatForm