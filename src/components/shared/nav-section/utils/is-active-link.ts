
export function isActiveLink(
    currentPathname: string,
    targetPath: string,
    deep: boolean = true
): boolean {
    if (!targetPath || targetPath.startsWith('#') || targetPath.startsWith('http')) {
        return false; // Ignore hash links and external URLs
    }

    const normalize = (path: string) =>
        path.replace(/\/+$/, '') // remove trailing slashes
            .replace(/\?.*$/, ''); // remove query params

    const current = normalize(currentPathname);
    const target = normalize(targetPath);

    return deep ? current.startsWith(target) : current === target;
}