export const state = () => ({
  loading: false,
  question: undefined as any,
  questions: [] as any[],
  questions_pagination: {
    current_page: 1,
    per_page: 15,
    total: 0,
  },
  question_topics: [] as string[],
  difficulty_levels: [
    {
      text: "Easy",
      value: "easy",
    },
    {
      text: "Medium",
      value: "medium",
    },
    {
      text: "Hard",
      value: "hard",
    },
  ] as any[],
  selected_topics: [] as any[],
  featured_topics: [] as any[],
});

export type QuestionState = ReturnType<typeof state>;
