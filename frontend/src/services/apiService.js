import { getApiBaseUrl } from '../utils/configureService';

const API_BASE = getApiBaseUrl();
export { API_BASE }; // export url to be used in test file
/**
 * Sends a registration request to the server.
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} Response data with message.
 */
export const register = async (email, username, password) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
    });

    const message = await response.text();

    if (!response.ok) {
        throw new Error(message.replace(/^"|"$/g, ''));
    }

    return { message }; 
};


/**
 * Sends a login request to the server.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Response data with token.
 * @throws {Error} If the login fails.
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
        throw new Error("Failed to login. Please try again");
    }

    return await response.json();
};

/**
 * Validates the current JWT token by checking with the backend.
 * @returns {Promise<boolean>} True if token is valid, false otherwise.
 */
export const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const res = await fetch(`${API_BASE}/auth/validate-token`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return res.ok;
    } catch (err) {
        console.error("Token validation error:", err);
        return false;
    }
};

/**
 * Creates a new group.
 * @param {Object} groupData
 * @returns {Promise<Object>} Response message from the server.
 */
export const createGroup = async (groupData) => {
    const token =getToken()
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
        throw new Error(errorData.message || "Failed to create group.");
    }

    return await response.json();
};

/**
 * Updates a group's information.
 * @param {number} groupId
 * @param {Object} groupData - Must match UpdateGroupRequestDTO
 * @returns {Promise<Object>} Response message from the server.
 */
export const updateGroup = async (groupId, groupData) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}/Groups/${groupId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(groupData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update group.");
    }

    return await response.json();
};

/**
 * Joins an existing group.
 * @param {number} groupId
 * @returns {Promise<Object>} Response message from the server.
 */
export const joinGroup = async (groupId) => {
    const token =getToken()
    const response = await fetch(`${API_BASE}/Groups/${groupId}/join`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join group.");
    }

    return await response.json();
};

/**
 * Leaves an existing group.
 * @param {number} groupId
 * @returns {Promise<Object>} Response message from the server.
 */
export const leaveGroup = async (groupId) => {
    const token = getToken()
    const response = await fetch(`${API_BASE}/Groups/${groupId}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error (errorData.message || "Failed to leave group.");

    }

    return await response.json();
};


/**
 * Fetch all existing groups from the server.
 * @returns {Promise<Array>} Array of group objects
 */
export const fetchGroups = async () => {
    const token =getToken()
    const response = await fetch(`${API_BASE}/Groups`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch groups.");
    }

    return await response.json();
};

/**
 * Fetches groups created by a specific user.
 * @param {string} userId
 * @returns {Promise<Array>} Array of groups
 */
export const fetchGroupsByUserId = async (userId) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}/Groups/user/${userId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData || `Failed to fetch groups for user ${userId}.`);
        return []; // Return an empty array on error
    }

    return await response.json();
};

/**
 * Fetches the user's sessions.
 * @returns {Promise<Array>} Array of user's sessions
 */
export const fetchUserGroups = async () => {
    const token =getToken()
    const response = await fetch(`${API_BASE}/Groups/user`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user's sessions.");
    }

    return await response.json();
}

/**
 * Fetches a group by its ID.
 * @returns {Promise<Object>} group data. 
*/
export const fetchGroupById = async (groupId) => {
    const token =getToken()
    const response = await fetch(`${API_BASE}/Groups/${groupId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch group of ID ${groupId}`);
    }

    return await response.json();
}

/**
 * Fetches the user's profile data.
 * @returns {Promise<Object>} User profile data
 */
export const fetchUserProfile = async () => {
    const token =getToken()
    const response = await fetch(`${API_BASE}/Users/get-profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile data.");
    }

    return await response.json();
}

/**
 * Fetches the profile data of a given user.
 * @returns {Promise<Object>} User profile data
 */
export const fetchProfile = async (userId) => {
    const token =getToken()
    const response = await fetch(`${API_BASE}/Users/profile/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch profile data of user ${userId}.`);
    }

    return await response.json();
}

/**
 * Updates the user's profile data.
 * @param {Object} profileData
 * @returns {Promise<Object>} Updated profile data
 */
export const updateUserProfile = async (profileData) => {
    const token =getToken();

    const isFormData = profileData.body instanceof FormData;

    const response = await fetch(`${API_BASE}/Users/update-profile`, {
        method: "PUT",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            "Authorization": `Bearer ${token}`
        },
        body: profileData.body
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
    }

    return await response.json();
};


/**
 * Reject user into group.
 * @param {number} groupId
 * @param {number} userId
 * @returns {Promise<Object>} Response message from the server.
 */
export const AcceptUserIntoGroup = async (groupId, userId) => {
    const token =getToken()
    const response = await fetch(`${API_BASE}/Groups/${groupId}/${userId}/accept`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to accept user.");
    }

    return await response.json();
};

/**
 * Reject user into group.
 * @param {number} groupId
 * @param {number} userId
 * @returns {Promise<Object>} Response message from the server.
 */
export const RejectUserFromGroup = async (groupId, userId) => {
    const token =getToken()
    const response = await fetch(`${API_BASE}/Groups/${groupId}/${userId}/reject`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to accept user.");
    }

    return await response.json();
};

/**
 * Gets the token from local storage.
 * @returns {string} The token.
 * @throws {Error} If the token is not found.
 */
export const getToken = () => {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("Token not found");
    }
    return token;
}

/**
 * Fetch all messages in a group chat.
 * @param {number} chatId
 */
export const fetchGroupMessages = async (chatId) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}/Chats/${chatId}/messages`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch messages.");
    }
  
    return await response.json();
  };
  
  /**
   * Send a message to a group session.
   * @param {number} groupId
   * @param {{ content: string }} messageBody
   */
  export const sendGroupMessage = async (groupId, messageBody) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}/Chats/session/${groupId}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(messageBody),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to send message.");
    }
  
    return await response.json();
  };

  export const getUserIdByEmail = async (email) => {
    const token = getToken();
    const response = await fetch(`${API_BASE}/users/profile/e-mail/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch user ID.");
    }
    return await response.json();
  }
  
  