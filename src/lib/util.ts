export function trim(s: string, maxLength = 200): string {
    if (s.length < maxLength) {
        return s;
    } else {
        return s.substring(0, maxLength) + "[...]";
    }
}

export function short(resourceID: string) {
    // Split resource by / and take the last index
    const rr = resourceID.split('/');

    return rr[rr.length - 1];
}