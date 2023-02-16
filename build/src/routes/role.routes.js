"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_controller_1 = require("../controllers/role.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const router = express_1.default.Router();
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
// Get currently logged in user
// router.get('/', hasPermission('Role:Read'), getMeHandler);
router.post('/', role_controller_1.addRole);
exports.default = router;
