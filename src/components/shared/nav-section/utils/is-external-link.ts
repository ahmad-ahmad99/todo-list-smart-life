

export function isExternalLink(url: string): boolean {
    if (!url) return false;

    const lower = url.toLowerCase().trim();
    return lower.startsWith('http://') || lower.startsWith('https://');
}