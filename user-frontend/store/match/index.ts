export const state = () => ({
  loading: false,
  open_matching_dialog: false,
  match: undefined as any,
  matches: [] as any[],
});

export type MatchState = ReturnType<typeof state>;
