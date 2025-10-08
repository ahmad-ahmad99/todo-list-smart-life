type StateProps = Record<
    string,
    boolean | [boolean, string] | undefined
>;

export function mergeClasses(
    className?: string | (string | undefined)[] | null,
    state?: StateProps
): string {
    const base = Array.isArray(className)
        ? className.filter(Boolean)
        : className ? [className] : [];

    const stateClasses = state
        ? Object.entries(state).flatMap(([key, value]) => {
            if (typeof value === 'boolean') {
                return value ? [key] : [];
            }
            if (Array.isArray(value)) {
                const [condition, override] = value;
                return condition ? [override || key] : [];
            }
            return [];
        })
        : [];

    return [...base, ...stateClasses].join(' ');
}



export interface InputPalette {
    lighter: string;
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
}



type ChannelMap<T extends Record<string, string>> = {
    [K in keyof T]: string;
};


export function createPaletteChannel<T extends Record<string, string>>(hexPalette: T): ChannelMap<T> {
    const convertToChannel = (hex: string): string => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r} ${g} ${b}`;
    };

    const channelMap = {} as ChannelMap<T>;

    (Object.keys(hexPalette) as Array<keyof T>).forEach((key) => {
        channelMap[key] = convertToChannel(hexPalette[key] as string);
    });

    return channelMap;
}


export function varAlpha(color: string, opacity: string | number = 1): string {
    return `rgba(${color} / ${opacity})`;
}





