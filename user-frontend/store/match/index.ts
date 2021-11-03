export const state = () => ({
  loading: false,
  open_elo_match_dialog: false,
  open_matching_dialog: false,
  match: undefined as any,
  matches: [] as any[],
  matches_pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  chat_messages: [] as any[],
  codes: "" as string,
  is_video_on: false,
});

export type MatchState = ReturnType<typeof state>;
