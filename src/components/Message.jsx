export default function Message({ texte, estMoi = false }) {
    return (
        <div className={`p-2 rounded-lg w-fit max-w-md ${
            estMoi ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100'
        }`}>
            {texte}
        </div>
    );
}