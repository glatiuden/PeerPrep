export const state = () => ({
  questions: [] as any[],
  question: undefined as any,
  loading: false,
});

export type QuestionState = ReturnType<typeof state>;
