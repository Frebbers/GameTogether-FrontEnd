/**
 * Returns the correct API base URL depending on the environment
 * Works in both browser and Node.js environments (Jest tests)
 */
const fallbackUrl = fallbackUrl; // Default fallback URL

export function getApiBaseUrl() {
    // Node.js environment check (for tests)
    if (typeof process !== 'undefined' && process.env && process.env.API_BASE) {
        console.log(`API base url is ${process.env.API_BASE}`);
        if (process.env.API_BASE === 'undefined') {
            console.warn(`API_BASE is undefined, using default: ${fallbackUrl}`);
        }
        return process.env.API_BASE;
    }
    // Browser/Vite environment
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) {
        console.log(`API base url is ${import.meta.env.VITE_API_BASE}`);
        if (import.meta.env.VITE_API_BASE === 'undefined') {
            console.warn(`VITE_API_BASE is undefined, using default: ${fallbackUrl}`);
        }
        return import.meta.env.VITE_API_BASE;
    }
    // Default fallback
    console.warn(`No API base URL found, using default: ${fallbackUrl}`);
    return fallbackUrl;
}