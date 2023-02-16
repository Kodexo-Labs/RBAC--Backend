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
exports.checkPermission = void 0;
const role_service_1 = require("../services/role.service");
const allRoles = (0, role_service_1.getRoles)();
console.log("Roles", allRoles);
const roles = {
    user: {
        can: [
            'account',
            'post:add',
            {
                name: 'post:save',
                when: (params) => __awaiter(void 0, void 0, void 0, function* () { return params.userId === params.ownerId; })
            },
            'user:create',
            {
                name: 'user:*',
                when: (params) => __awaiter(void 0, void 0, void 0, function* () { return params.id === params.userId; })
            }
        ]
    },
    manager: {
        can: ['post:save', 'post:delete', 'account:*'],
        inherits: ['user']
    },
    admin: {
        can: ['role:create'],
        inherits: ['manager']
    }
};
const rbac = require('easy-rbac').create(roles);
function checkPermission(roleId, permission, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield rbac.can(roleId, permission, params);
        // console.log("Roles", allRoles)
        return result;
    });
}
exports.checkPermission = checkPermission;
