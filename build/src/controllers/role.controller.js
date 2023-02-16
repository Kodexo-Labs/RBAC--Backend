"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRole = void 0;
const role_service_1 = require("./../services/role.service");
const addRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, permissions, inherits } = req.body;
        const role = yield (0, role_service_1.createRole)({
            name,
            permissions,
            inherits
        });
        res.status(201).json({
            status: 'success',
            data: {
                role,
            },
        });
    }
    catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Role with that name already exist',
            });
        }
        next(err);
    }
});
exports.addRole = addRole;
