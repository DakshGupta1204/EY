"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const router = (0, express_1.Router)();
router.get('/', userControllers_1.getUsers);
router.post('/', userControllers_1.createUser);
exports.default = router;
