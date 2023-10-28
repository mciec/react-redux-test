import { useState } from "react";

export const useLocalStorage = <T>(keyName: string, defaultValue: T): [storedValue: T, setStoredValue: (newValue: T) => void] => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value) as T;
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = (newValue?: T) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) { /* empty */ }
        if (newValue === undefined)
            window.localStorage.removeItem(keyName)
        else
            setStoredValue(newValue);
    };
    return [storedValue, setValue];
};