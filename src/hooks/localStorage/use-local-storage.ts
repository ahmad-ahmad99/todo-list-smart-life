import { useState, useEffect, useCallback } from 'react';

export type UseLocalStorageOptions = {
    initializeWithValue?: boolean;
};

export type UseLocalStorageReturn<T> = {
    state: T;
    setState: (updateState: T | Partial<T>) => void;
    setField: <K extends keyof T>(name: K, updateValue: T[K]) => void;
    resetState: (defaultState?: T) => void;
};

export function useLocalStorage<T>(
    key: string,
    initialState?: T,
    options: UseLocalStorageOptions = { initializeWithValue: true }
): UseLocalStorageReturn<T> {
    const getInitial = (): T => {
        try {
            const stored = localStorage.getItem(key);
            if (stored !== null) return JSON.parse(stored);
        } catch (error) {
            console.warn(`useLocalStorage: failed to parse key "${key}"`, error);
        }
        return initialState as T;
    };

    const [state, setInternalState] = useState<T>(() =>
        options.initializeWithValue ? getInitial() : (initialState as T)
    );

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.warn(`useLocalStorage: failed to save key "${key}"`, error);
        }
    }, [key, state]);

    const setState = useCallback((updateState: T | Partial<T>) => {
        setInternalState((prev) => ({
            ...prev,
            ...(typeof updateState === 'object' ? updateState : {}),
        }));
    }, []);

    const setField = useCallback(
        <K extends keyof T>(name: K, updateValue: T[K]) => {
            setInternalState((prev) => ({
                ...prev,
                [name]: updateValue,
            }));
        },
        []
    );

    const resetState = useCallback((defaultState?: T) => {
        localStorage.removeItem(key);
        setInternalState(defaultState ?? (initialState as T));
    }, [key, initialState]);

    return { state, setState, setField, resetState };
}
