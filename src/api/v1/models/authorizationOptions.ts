/**
 * Defines access control options for protected routes.
 * @param hasRole - List of roles that can access the route.
 * @param allowSameUser - If true, users can access their own records.
 * @example
 * { hasRole: ["admin", "manager"], allowSameUser: true } as AuthorizationOptions
 */
export interface AuthorizationOptions {
    hasRole: Array<"admin" | "organizer" | "user">;
    allowSameUser?: boolean;
}
