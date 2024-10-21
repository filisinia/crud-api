import http from 'http';
import url from 'url';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { sendJsonResponse } from './utils/sendJson.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
let users = [];

// Handle GET requests
const handleGetUsers = (res) => {
    sendJsonResponse(res, 200, users);
};

const handleGetUserById = (res, userId) => {
    if (!userId || !uuidv4.validate(userId)) {
        return sendJsonResponse(res, 400, { message: 'Invalid userId' });
    }
    const user = users.find((u) => u.id === userId);
    if (!user) {
        return sendJsonResponse(res, 404, { message: 'User not found' });
    }
    sendJsonResponse(res, 200, user);
};

// Handle POST requests
const handleCreateUser = (res, body) => {
    const { username, age, hobbies } = JSON.parse(body);
    if (!username || !age || !Array.isArray(hobbies)) {
        return sendJsonResponse(res, 400, { message: 'Missing required fields' });
    }
    const newUser = { id: uuidv4(), username, age, hobbies };
    users.push(newUser);
    sendJsonResponse(res, 201, newUser);
};

// Handle PUT requests
const handleUpdateUser = (res, userId, body) => {
    if (!userId || !uuidv4.validate(userId)) {
        return sendJsonResponse(res, 400, { message: 'Invalid userId' });
    }
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return sendJsonResponse(res, 404, { message: 'User not found' });
    }
    const { username, age, hobbies } = JSON.parse(body);
    users[userIndex] = { ...users[userIndex], username, age, hobbies };
    sendJsonResponse(res, 200, users[userIndex]);
};

// Handle DELETE requests
const handleDeleteUser = (res, userId) => {
    if (!userId || !uuidv4.validate(userId)) {
        return sendJsonResponse(res, 400, { message: 'Invalid userId' });
    }
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        return sendJsonResponse(res, 404, { message: 'User not found' });
    }
    users.splice(userIndex, 1);
    sendJsonResponse(res, 204, {});
};

// Create server
const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    const userId = pathname.split('/')[3];

    // Parse request body
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        switch (req.method) {
            case 'GET':
                if (pathname === '/api/users') {
                    handleGetUsers(res);
                } else if (pathname.startsWith('/api/users/')) {
                    handleGetUserById(res, userId);
                } else {
                    sendJsonResponse(res, 404, { message: 'Not Found' });
                }
                break;
            case 'POST':
                if (pathname === '/api/users') {
                    handleCreateUser(res, body);
                } else {
                    sendJsonResponse(res, 404, { message: 'Not Found' });
                }
                break;
            case 'PUT':
                if (pathname.startsWith('/api/users/')) {
                    handleUpdateUser(res, userId, body);
                } else {
                    sendJsonResponse(res, 404, { message: 'Not Found' });
                }
                break;
            case 'DELETE':
                if (pathname.startsWith('/api/users/')) {
                    handleDeleteUser(res, userId);
                } else {
                    sendJsonResponse(res, 404, { message: 'Not Found' });
                }
                break;
            default:
                sendJsonResponse(res, 405, { message: 'Method Not Allowed' });
                break;
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
