import './App.css'
import ConversationList from "./components/ConversationList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import {useEffect, useState} from "react";
import {useLocalStorage} from "./hooks/useLocalStorage.jsx";

function App() {
    const [activeId, setActiveId] = useState(1);


    const [conversations, setConversations] = useLocalStorage('conversations', [
        { id: 1, nom: 'John Doe', messages: ['Welcome to John Doe'] },
        { id: 2, nom: 'The Rock', messages: ['Trop stylé mec'] }
    ]);

    useEffect(() => {
        localStorage.setItem('conversations', JSON.stringify(conversations));
    }, [conversations]);

    function handleSendMessage(conversationId, texte) {
        setConversations(prev =>
            prev.map(conv =>
                conv.id === conversationId
                    ? { ...conv, messages: [...conv.messages, texte] }
                    : conv
            )
        );
    }


    const activeConversation = conversations.find(c => c.id === activeId);

    return (
        <div className="flex h-screen">
            <ConversationList
                conversations={conversations}
                activeId={activeId}
                onSelect={setActiveId}
            />
            <ChatWindow conversation={activeConversation} onSendMessage={handleSendMessage} />
        </div>
    );
}

export default App
