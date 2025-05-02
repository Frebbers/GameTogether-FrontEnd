// src/services/__tests__/apiService.test.js
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as apiService from '../apiService';

// Mock environment variable
process.env.VITE_API_BASE = 'http://test-api.com/api';
const API_BASE = 'http://test-api.com/api';

// Setup MSW server to intercept API requests
const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
    localStorage.clear();
});
afterAll(() => server.close());

describe('API Service Integration Tests', () => {
    // 1. Register Tests
    describe('register', () => {
        test('registers user successfully', async () => {
            server.use(
                rest.post(`${API_BASE}/auth/register`, (req, res, ctx) => {
                    return res(ctx.status(200), ctx.text('Registration successful'));
                })
            );

            const result = await apiService.register('test@example.com', 'testuser', 'password123');
            expect(result.message).toBe('Registration successful');
        });

        test('handles registration error', async () => {
            server.use(
                rest.post(`${API_BASE}/auth/register`, (req, res, ctx) => {
                    return res(ctx.status(400), ctx.text('Email already exists'));
                })
            );

            await expect(apiService.register('test@example.com', 'testuser', 'password123'))
                .rejects.toThrow('Email already exists');
        });
    });

    // 2. Login Tests
    describe('login', () => {
        test('logs in user successfully', async () => {
            server.use(
                rest.post(`${API_BASE}/auth/login`, (req, res, ctx) => {
                    return res(ctx.json({ token: 'test-token', userId: 1 }));
                })
            );

            const result = await apiService.login('test@example.com', 'password123');
            expect(result).toEqual({ token: 'test-token', userId: 1 });
        });

        test('handles login error', async () => {
            server.use(
                rest.post(`${API_BASE}/auth/login`, (req, res, ctx) => {
                    return res(ctx.status(401));
                })
            );

            await expect(apiService.login('test@example.com', 'wrongpassword'))
                .rejects.toThrow('Failed to login. Please try again');
        });
    });

    // 3. Create Group Tests
    describe('createGroup', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('creates group successfully', async () => {
            server.use(
                rest.post(`${API_BASE}/Groups/create`, (req, res, ctx) => {
                    return res(ctx.json({ id: 1, name: 'Test Group' }));
                })
            );

            const result = await apiService.createGroup({ name: 'Test Group', description: 'Test Description' });
            expect(result).toEqual({ id: 1, name: 'Test Group' });
        });

        test('handles create group error', async () => {
            server.use(
                rest.post(`${API_BASE}/Groups/create`, (req, res, ctx) => {
                    return res(ctx.status(400), ctx.json({ error: 'Invalid group data' }));
                })
            );

            await expect(apiService.createGroup({ name: '' }))
                .rejects.toThrow('Invalid group data');
        });
    });

    // 4. Join Group Tests
    describe('joinGroup', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('joins group successfully', async () => {
            server.use(
                rest.post(`${API_BASE}/Groups/1/join`, (req, res, ctx) => {
                    return res(ctx.json({ message: 'Joined group successfully' }));
                })
            );

            const result = await apiService.joinGroup(1);
            expect(result).toEqual({ message: 'Joined group successfully' });
        });

        test('handles join group error', async () => {
            server.use(
                rest.post(`${API_BASE}/Groups/1/join`, (req, res, ctx) => {
                    return res(ctx.status(400), ctx.json({ error: 'Already a member' }));
                })
            );

            await expect(apiService.joinGroup(1))
                .rejects.toThrow('Already a member');
        });
    });

    // 5. Leave Group Tests
    describe('leaveGroup', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('leaves group successfully', async () => {
            server.use(
                rest.delete(`${API_BASE}/Groups/1/leave`, (req, res, ctx) => {
                    return res(ctx.json({ message: 'Left group successfully' }));
                })
            );

            const result = await apiService.leaveGroup(1);
            expect(result).toEqual({ message: 'Left group successfully' });
        });

        test('handles leave group error', async () => {
            server.use(
                rest.delete(`${API_BASE}/Groups/1/leave`, (req, res, ctx) => {
                    return res(ctx.status(400), ctx.json({ error: 'Not a member' }));
                })
            );

            await expect(apiService.leaveGroup(1))
                .rejects.toThrow('Not a member');
        });
    });

    // 6. Fetch Groups Tests
    describe('fetchGroups', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('fetches groups successfully', async () => {
            const mockGroups = [
                { id: 1, name: 'Group 1' },
                { id: 2, name: 'Group 2' }
            ];

            server.use(
                rest.get(`${API_BASE}/Groups`, (req, res, ctx) => {
                    return res(ctx.json(mockGroups));
                })
            );

            const result = await apiService.fetchGroups();
            expect(result).toEqual(mockGroups);
        });

        test('handles fetch groups error', async () => {
            server.use(
                rest.get(`${API_BASE}/Groups`, (req, res, ctx) => {
                    return res(ctx.status(500), ctx.json({ error: 'Server error' }));
                })
            );

            await expect(apiService.fetchGroups())
                .rejects.toThrow('Server error');
        });
    });

    // 7. Fetch User Groups Tests
    describe('fetchUserGroups', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('fetches user groups successfully', async () => {
            const mockUserGroups = [
                { id: 1, name: 'My Group 1' },
                { id: 2, name: 'My Group 2' }
            ];

            server.use(
                rest.get(`${API_BASE}/Groups/user`, (req, res, ctx) => {
                    return res(ctx.json(mockUserGroups));
                })
            );

            const result = await apiService.fetchUserGroups();
            expect(result).toEqual(mockUserGroups);
        });

        test('handles fetch user groups error', async () => {
            server.use(
                rest.get(`${API_BASE}/Groups/user`, (req, res, ctx) => {
                    return res(ctx.status(500), ctx.json({ error: 'Auth required' }));
                })
            );

            await expect(apiService.fetchUserGroups())
                .rejects.toThrow('Auth required');
        });
    });

    // 8. Fetch Group By ID Tests
    describe('fetchGroupById', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('fetches group by ID successfully', async () => {
            const mockGroup = { id: 1, name: 'Test Group', description: 'Test Description' };

            server.use(
                rest.get(`${API_BASE}/Groups/1`, (req, res, ctx) => {
                    return res(ctx.json(mockGroup));
                })
            );

            const result = await apiService.fetchGroupById(1);
            expect(result).toEqual(mockGroup);
        });

        test('handles fetch group by ID error', async () => {
            server.use(
                rest.get(`${API_BASE}/Groups/999`, (req, res, ctx) => {
                    return res(ctx.status(404), ctx.json({ error: 'Group not found' }));
                })
            );

            await expect(apiService.fetchGroupById(999))
                .rejects.toThrow('Group not found');
        });
    });

    // 9. Fetch User Profile Tests
    describe('fetchUserProfile', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('fetches user profile successfully', async () => {
            const mockProfile = { id: 1, username: 'testuser', email: 'test@example.com' };

            server.use(
                rest.get(`${API_BASE}/Users/get-profile`, (req, res, ctx) => {
                    return res(ctx.json(mockProfile));
                })
            );

            const result = await apiService.fetchUserProfile();
            expect(result).toEqual(mockProfile);
        });

        test('handles fetch profile error', async () => {
            server.use(
                rest.get(`${API_BASE}/Users/get-profile`, (req, res, ctx) => {
                    return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
                })
            );

            await expect(apiService.fetchUserProfile())
                .rejects.toThrow('Unauthorized');
        });
    });

    // 10. Fetch Profile Tests
    describe('fetchProfile', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('fetches profile by ID successfully', async () => {
            const mockProfile = { id: 2, username: 'otheruser' };

            server.use(
                rest.get(`${API_BASE}/Users/2/profile`, (req, res, ctx) => {
                    return res(ctx.json(mockProfile));
                })
            );

            const result = await apiService.fetchProfile(2);
            expect(result).toEqual(mockProfile);
        });

        test('handles fetch profile by ID error', async () => {
            server.use(
                rest.get(`${API_BASE}/Users/999/profile`, (req, res, ctx) => {
                    return res(ctx.status(404), ctx.json({ error: 'User not found' }));
                })
            );

            await expect(apiService.fetchProfile(999))
                .rejects.toThrow('User not found');
        });
    });

    // 11. Update User Profile Tests
    describe('updateUserProfile', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('updates user profile successfully', async () => {
            const mockUpdatedProfile = { id: 1, username: 'updateduser' };
            const profileData = { body: JSON.stringify({ username: 'updateduser' }) };

            server.use(
                rest.put(`${API_BASE}/Users/update-profile`, (req, res, ctx) => {
                    return res(ctx.json(mockUpdatedProfile));
                })
            );

            const result = await apiService.updateUserProfile(profileData);
            expect(result).toEqual(mockUpdatedProfile);
        });

        test('handles update profile error', async () => {
            server.use(
                rest.put(`${API_BASE}/Users/update-profile`, (req, res, ctx) => {
                    return res(ctx.status(400), ctx.json({ error: 'Invalid data' }));
                })
            );

            await expect(apiService.updateUserProfile({ body: JSON.stringify({ username: '' }) }))
                .rejects.toThrow('Invalid data');
        });
    });

    // 12. Accept User Into Group Tests
    describe('AcceptUserIntoGroup', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('accepts user into group successfully', async () => {
            server.use(
                rest.get(`${API_BASE}/Groups/1/2/accept`, (req, res, ctx) => {
                    return res(ctx.json({ message: 'User accepted' }));
                })
            );

            const result = await apiService.AcceptUserIntoGroup(1, 2);
            expect(result).toEqual({ message: 'User accepted' });
        });

        test('handles accept user error', async () => {
            server.use(
                rest.get(`${API_BASE}/Groups/1/2/accept`, (req, res, ctx) => {
                    return res(ctx.status(400), ctx.json({ error: 'Not group admin' }));
                })
            );

            await expect(apiService.AcceptUserIntoGroup(1, 2))
                .rejects.toThrow('Not group admin');
        });
    });

    // 13. Reject User From Group Tests
    describe('RejectUserFromGroup', () => {
        beforeEach(() => {
            localStorage.setItem('token', 'test-token');
        });

        test('rejects user from group successfully', async () => {
            server.use(
                rest.get(`${API_BASE}/Groups/1/2/reject`, (req, res, ctx) => {
                    return res(ctx.json({ message: 'User rejected' }));
                })
            );

            const result = await apiService.RejectUserFromGroup(1, 2);
            expect(result).toEqual({ message: 'User rejected' });
        });

        test('handles reject user error', async () => {
            server.use(
                rest.get(`${API_BASE}/Groups/1/2/reject`, (req, res, ctx) => {
                    return res(ctx.status(400), ctx.json({ error: 'Not group admin' }));
                })
            );

            await expect(apiService.RejectUserFromGroup(1, 2))
                .rejects.toThrow('Not group admin');
        });
    });
});