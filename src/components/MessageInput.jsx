import {useState} from "react";

export default function MessageInput({onSendMessage}) {
    const [texte, setTexte] = useState('')
    function handleClick(){
        if (texte.trim() === '') return // évite d'envoyer un message vide

        onSendMessage(texte);
        setTexte('')
    }
    return (
        <div className="flex items-center gap-2 px-4 py-3 border-t bg-white">
            <input
                type="text"
                value={texte}
                onChange={e => setTexte(e.target.value)}
                placeholder="Écris un message..."
                className="flex-1 px-4 py-2 rounded-full bg-gray-100 border-none outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <button onClick={handleClick}
                className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Envoyer
            </button>
        </div>
    )
}