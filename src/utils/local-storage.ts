export function getStorage<T>(key: string, defaultValue?: T): T | null | undefined {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null) return defaultValue ?? null;

        return JSON.parse(raw) as T;
    } catch (error) {
        console.warn(`getStorage: Failed to parse key "${key}"`, error);
        return defaultValue ?? null;
    }
}

