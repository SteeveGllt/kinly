import {useEffect, useState} from "react";

export function useLocalStorage(key, defaultValue) {
    const [valeur, setValeur] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(valeur));
    }, [key, valeur]);

    return [valeur, setValeur];
}