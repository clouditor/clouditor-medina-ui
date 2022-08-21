export function trim(s: string, maxLength = 200): string {
    if (s.length < maxLength) {
        return s;
    } else {
        return s.substring(0, maxLength) + "[...]";
    }
}