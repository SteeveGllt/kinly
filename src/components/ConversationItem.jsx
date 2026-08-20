export default function ConversationItem({ nom, message, isSelected, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
        >
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
                {nom.charAt(0)}
            </div>
            <div className="min-w-0">
                <div className="font-medium text-gray-900 truncate">{nom}</div>
                <div className="text-sm text-gray-500 truncate">{message}</div>
            </div>
        </div>
    );
}