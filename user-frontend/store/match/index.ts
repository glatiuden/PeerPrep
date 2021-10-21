export const state = () => ({
  loading: false,
  match: undefined as any,
  matches: [] as any[],
});

export type MatchState = ReturnType<typeof state>;
