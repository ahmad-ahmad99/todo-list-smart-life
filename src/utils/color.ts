export function hexToRgbChannel(hexColor: string): string {
    const hex = hexColor.replace(/^#/, '');

    if (!/^([A-Fa-f0-9]{6})$/.test(hex)) {
        throw new Error(`Invalid hex color: "${hexColor}"`);
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `${r} ${g} ${b}`;
}