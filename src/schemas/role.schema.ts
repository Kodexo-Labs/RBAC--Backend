import { object, string, array, TypeOf, z } from 'zod';

export const createRoleSchema = object({
  body: object({
    name: string({
      required_error: 'Role name is required',
    }),
    permissions: string().array().min(1),
    inherits: string().array(),
  })
});

export type CreateRoleInput = TypeOf<typeof createRoleSchema>['body'];
