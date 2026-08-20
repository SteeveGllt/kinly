import MessageInput from "./MessageInput.jsx";
import Message from "./Message.jsx";

export default function ChatWindow({conversation, onSendMessage}) {

    if(!conversation){
        return (
            <div className="flex-1 flex items-center justify-center text-gray-400">
                Sélectionne une conversation
            </div>
        )
    }
    return (
        <div className="flex flex-col flex-1 h-screen">
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
                {conversation.messages.map((texte, index) => (
                    <Message key={index} texte={texte} />
                ))}
            </div>

            <MessageInput onSendMessage={(texte) => onSendMessage(conversation.id, texte)} />
        </div>
    );
}