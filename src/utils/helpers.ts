/**
 * Convert unicode to native emoji
 *
 * @param unicode - emoji unicode
 */
export function unicodeToEmoji(unicode: string) {
    return unicode
        .split('-')
        .map((hex) => parseInt(hex, 16))
        .map((hex) => String.fromCodePoint(hex))
        .join('')
}

/**
 * Check if userAgent is mac.
 *
 * @return boolean;
 */
export function isMac() {
    let platform =
        // @ts-ignore
        navigator?.userAgentData?.platform || navigator?.platform || 'unknown'
    return platform.toUpperCase().indexOf('MAC') !== -1
}
