export const state = () => ({
  admin: undefined as any,
  has_admin: false,
  loading: false,
});

export type AuthState = ReturnType<typeof state>;
