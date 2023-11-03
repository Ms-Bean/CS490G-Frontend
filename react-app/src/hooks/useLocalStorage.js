import { useState } from "react";

export const useLocalStorage = () => {
    const [value, setValue] = useState(null);

    const setItem = (keyName, keyValue) => {
        localStorage.setItem(keyName, keyValue);
        setValue(keyValue);
    };

    const getItem = (keyName) => {
        const value = localStorage.getItem(keyName);
        setValue(value);
        return value;
    };

    const removeItem = (keyName) => {
        localStorage.removeItem(keyName);
        setValue(null);
    };

    return {value, setItem, getItem, removeItem};

};
