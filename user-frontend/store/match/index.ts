export const state = () => ({
  loading: false,
  open_matching_dialog: false,
  match: undefined as any,
  matches: [] as any[],
  chat_messages: [] as any[],
  codes: "" as string,
});

export type MatchState = ReturnType<typeof state>;
