export const state = () => ({
  loading: false,
  open_matching_dialog: false,
  match: undefined as any,
  matches: [] as any[],
  chat_messages: [] as any[],
  codes: "" as string,
  open_elo_match_dialog: false,
});

export type MatchState = ReturnType<typeof state>;
