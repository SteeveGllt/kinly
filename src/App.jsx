import './App.css'
import ConversationList from "./components/ConversationList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

function App() {
    const conversations = [
        { id: 1, nom: 'John Doe', message: 'Welcome to John Doe' },
        { id: 2, nom: 'The Rock', message: 'Trop stylé mec' }
    ]
  return (
      <div className="flex  h-screen">
          <ConversationList conversations={conversations} />
          <ChatWindow />
      </div>
  )
}

export default App
