export const state = () => ({
  user: undefined as any,
  has_user: false,
  loading: false,
});

export type UserState = ReturnType<typeof state>;
