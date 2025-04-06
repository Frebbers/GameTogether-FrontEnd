const API_BASE = "http://localhost:5000/api";

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
    console.log(response.body);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed.");
    }

    return await response.json();
};

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
 * Creates a new session.
 * @param {Object} sessionData
 */
export const createSession = async (sessionData) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE}/Sessions/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create session.");
    }

    return await response.json();
};


/**
 * Joins an existing session.
 * @param {sessionId} sessionId
 */
export const joinSession = async (sessionId) => {
    const token = localStorage.getItem("token")
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
 * @param {sessionId} sessionId
 */
export const leaveSession = async (sessionId) => {
    const token = localStorage.getItem("token")
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

/**
 * Fetch all existing sessions from the server.
 * @returns {Promise<Array>} Array of group objects
 */
export const fetchSessions = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE}/Sessions`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch sesesions.");
    }

    return await response.json();
};

/**
 * Fetches the user's profile data.
 * @returns {Promise<Object>} User profile data
 */
export const fetchUserProfile = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE}/Users/get-profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch profile data.");
    }

    return await response.json();
}

/**
 * Updates the user's profile data.
 * @param {Object} profileData
 * @returns {Promise<Object>} Updated profile data
 */
export const updateUserProfile = async (profileData) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE}/Users/update-profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: profileData.body
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile.");
    }

    return await response.json();
}