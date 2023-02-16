import { Role } from '../entities/role.entity';
import { CreateRoleInput } from '../schemas/role.schema';
import { AppDataSource } from '../utils/data-source';

const roleRepository = AppDataSource.getRepository(Role);

export const createRole = async (input: CreateRoleInput) => {
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(Role, input)
  )) as Role;
};

export const getRoles = () => {
  return roleRepository.find();
}

export const getRoleById = (userId: string): Promise<Role | null> => {
  return roleRepository.findOneBy({ id: userId });
}

export const updatePermission = async (userId: string, permission: string[]) => {
  return await AppDataSource.createQueryBuilder()
    .update(Role)
    .set({permissions: permission})
    .where("id = :id", { id: userId })
    .execute()
}

export const getRolesByInherit = async (inherit: string) => {
    return await AppDataSource.createQueryBuilder()
      .select()
      .from(Role, 'role')
      .where('ARRAY[role.inherits] @> :inherit', {inherit: [inherit]})
      .execute();
}

export const deleteRoleSideEffects = async (userId: string, permission: string[], inherits: string[]) => {
   return await AppDataSource.createQueryBuilder()
    .update(Role)
    .set({permissions: permission, inherits})
    .where("id = :id", { id: userId })
    .execute()
}

export const deleteRole = async(roleId: string) => {
  return await AppDataSource.createQueryBuilder()
    .delete()
    .from(Role, 'role')
    .where("id = :id", { id: roleId })
    .execute()
}
