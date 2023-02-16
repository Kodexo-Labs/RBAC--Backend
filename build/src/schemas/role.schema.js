"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoleSchema = void 0;
const zod_1 = require("zod");
exports.createRoleSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Role name is required',
        }),
        permissions: (0, zod_1.string)().array().min(1),
        inherits: (0, zod_1.string)().array(),
    })
});
