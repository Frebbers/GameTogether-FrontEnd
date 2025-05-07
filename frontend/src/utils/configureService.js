/**
 * Returns the correct API base URL depending on the environment
 * Works in both browser and Node.js environments (Jest tests)
 */
export function getApiBaseUrl() {
    // Node.js environment check (for tests)
    if (typeof process !== 'undefined' && process.env && process.env.API_BASE) {
        console.log(`API base url is ${process.env.API_BASE}`);
        return process.env.API_BASE;
    }

    // Browser/Vite environment
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) {
        console.log(`API base url is ${import.meta.env.VITE_API_BASE}`);
        return import.meta.env.VITE_API_BASE;
    }

    // Default fallback
    console.warn('No API base URL found, using default: http://localhost:7191/api');
    return "http://localhost:7191/api";
}