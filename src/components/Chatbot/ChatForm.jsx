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
        { role: "model", text: "Thinking..." },
      ])
      
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the portfolio details provided, please address this query: ${userMessage}`,
        },
      ])
    }, 600)
  }

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Ask about Adnan's portfolio..."
        className="message-input"
        required
      />
      <button type="submit">↑</button>
    </form>
  )
}

export default ChatForm