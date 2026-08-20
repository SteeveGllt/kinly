import ConversationItem from "./ConversationItem.jsx";

export default function ConversationList({ conversations, activeId, onSelect }) {
    return (
        <div className="w-72 border-r h-screen overflow-y-auto py-2">
            {conversations.map(conversation => (
                <ConversationItem
                    key={conversation.id}
                    nom={conversation.nom}
                    message={conversation.messages[conversation.messages.length - 1] ?? 'Aucun message'}
                    isSelected={conversation.id === activeId}
                    onClick={() => onSelect(conversation.id)}
                />
            ))}
        </div>
    );
}