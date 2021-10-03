export const state = () => ({
  editors: [] as any[],
  editor: undefined as any,
  loading: false,
});

export type EditorState = ReturnType<typeof state>;
