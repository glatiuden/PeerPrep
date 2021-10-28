export const state = () => ({
  users: [] as any[],
  user: undefined as any,
  users_pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  loading: false,
  user_id: "" as string,
});

export type UserState = ReturnType<typeof state>;
