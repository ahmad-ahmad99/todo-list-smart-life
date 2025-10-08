export function setFont(fontName?: string): string {
    const fallbackFonts = [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ];

    return fontName ? `${fontName}, ${fallbackFonts.join(', ')}` : fallbackFonts.join(', ');
}


export function remToPx(value: string): number {
    const remMatch = /^([\d.]+)rem$/i.exec(value.trim());

    if (!remMatch) {
        throw new Error(`Invalid rem value: "${value}"`);
    }

    const rem = parseFloat(remMatch[1]);
    const baseFontSize = 16; // Default browser font size

    return Math.round(rem * baseFontSize);
}
