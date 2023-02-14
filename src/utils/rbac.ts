const roles = {
  user: {
    can: [
      'account', 
      'post:add', 
      { 
          name: 'post:save',
          when: async (params: any) => params.userId === params.ownerId
      },
      'user:create',
      {
        name: 'user:*',
        when: async (params: any) => params.id === params.userId
      }
    ]
  },
  manager: {
    can: ['post:save', 'post:delete', 'account:*'],
    inherits: ['user']
  },
  admin: {
    can: ['see-profile'],
    inherits: ['manager']
  }
}
 
const rbac = require('easy-rbac').create(roles);

export async function checkPermission(roleId: string, permission: string, params: any) {
  const result = await rbac.can(roleId, permission, params);
  return result;
}