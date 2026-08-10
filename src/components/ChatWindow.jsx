import MessageInput from "./MessageInput.jsx";
import {useState} from "react";

export default function ChatWindow() {
    const [messages, setMessages] = useState([]);

    function handleSendMessage(texte) {
        const nouveauMessage = {
            id: Date.now(), // un id unique simple, basé sur l'horodatage
            texte: texte
        }
        setMessages([...messages, nouveauMessage])
    }
    return (
        <div className="flex flex-col flex-1 h-screen">
            <div className="flex-1 overflow-y-auto px-4 py-4">
                {messages.map(message => (
                    <div key={message.id} className="mb-2">
                        {message.texte}
                    </div>
                ))}
            </div>

            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    )
}