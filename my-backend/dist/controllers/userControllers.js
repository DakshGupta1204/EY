"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const getUsers = (req, res) => {
    res.json({ message: 'Get all users' });
};
exports.getUsers = getUsers;
const createUser = (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ message: 'User created', data: { name, email } });
};
exports.createUser = createUser;
