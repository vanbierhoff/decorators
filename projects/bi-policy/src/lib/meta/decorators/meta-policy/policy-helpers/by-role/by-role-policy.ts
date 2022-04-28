
export interface InstanceFormByRole {
    auth?: AuthorizationService;
}

export interface AuthorizationService<> {
    roles: string[]
}



export function byRolePolicy<T extends InstanceFormByRole>(conditionRoles: string[]):
    (target: object, instance: T, propertyKey: string) => boolean {
    return (target: object, instance: T, propertyKey: string): boolean => {

        /// CHECK FOR AUTH SERVICE IN INSTANCE
        if (Array.isArray(instance.auth.roles)) {
            // searching first coincidence of roles in arrays.
            return instance.auth.roles.some((serRole) => conditionRoles.some((roleUser => serRole === roleUser)));
        }
        throw new Error('user roles not array');
    };
}


