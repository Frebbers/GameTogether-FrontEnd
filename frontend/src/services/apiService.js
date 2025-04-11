const API_BASE = "http://localhost:5238/api";

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
 * Creates a new group.
 * @param {Object} groupData
 * @returns {Promise<Object>} Response message from the server.
 */
export const createGroup = async (groupData) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE}/Groups/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(groupData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create group.");
    }

    return await response.json();
};

/**
 * Joins an existing group.
 * @param {number} groupId
 * @returns {Promise<Object>} Response message from the server.
 */
export const joinGroup = async (groupId) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE}/Groups/${groupId}/join`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join group.");
    }

    return await response.json();
};

/**
 * Leaves an existing group.
 * @param {number} groupId
 * @returns {Promise<Object>} Response message from the server.
 */
export const leaveGroup = async (groupId) => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE}/Groups/${groupId}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to leave group.");
    }

    return await response.json();
};

/**
 * Fetch all existing groups from the server.
 * @returns {Promise<Array>} Array of group objects
 */
export const fetchGroups = async () => {
    const token = localStorage.getItem("token")
    const response = await fetch(`${API_BASE}/Groups`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch groups.");
    }

    return await response.json();
};
