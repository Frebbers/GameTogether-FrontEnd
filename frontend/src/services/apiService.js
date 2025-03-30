const API_BASE = "/api";

/**
 * Sends a login request to the server.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Response data with token.
 */
export const login = async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed.");
    }

    return await response.json();
};

/**
 * Sends a registration request to the server.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Response data with message.
 */
export const register = async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed.");
    }

    return await response.json();
};



/**
 * Creates a new session.
 * @param {string} token 
 * @param {Object} sessionData
 */
export const createSession = async (token, sessionData) => {
    const response = await fetch(`${API_BASE}/Sessions/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionData }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create session.");
    }

    return await response.json();
};


/**
 * Joins an existing session.
 * @param {string} token 
 * @param {sessionId} sessionId
 */
export const joinSession = async (token, sessionId) => {
    const response = await fetch(`${API_BASE}/Sessions/${sessionId}/join`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join session.");
    }

    return await response.json();
};

/**
 * Leaves an existing session.
 * @param {string} token 
 * @param {sessionId} sessionId
 */
export const leaveSession = async (token, sessionId) => {
    const response = await fetch(`${API_BASE}/Sessions/${sessionId}/leave`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to leave session.");
    }

    return await response.json();
};