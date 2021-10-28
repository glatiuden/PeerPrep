export const state = () => ({
  matches: [] as any[],
  match: undefined as any,
  matches_pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  loading: false,
  match_id: "" as string,
  match_status: "" as string,
});

export type MatchState = ReturnType<typeof state>;
