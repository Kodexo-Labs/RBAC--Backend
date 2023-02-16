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
exports.getRoles = exports.createRole = void 0;
const role_entity_1 = require("../entities/role.entity");
const data_source_1 = require("../utils/data-source");
const roleRepository = data_source_1.AppDataSource.getRepository(role_entity_1.Role);
const createRole = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield data_source_1.AppDataSource.manager.save(data_source_1.AppDataSource.manager.create(role_entity_1.Role, input)));
});
exports.createRole = createRole;
const getRoles = () => {
    return roleRepository.find();
};
exports.getRoles = getRoles;
// export const findUserByEmail = async ({ email }: { email: string }) => {
//   return await userRepository.findOneBy({ email });
// };
// export const findUserById = async (userId: string) => {
//   return await userRepository.findOneBy({ id: userId });
// };
// export const findUser = async (query: Object) => {
//   return await userRepository.findOneBy(query);
// };
