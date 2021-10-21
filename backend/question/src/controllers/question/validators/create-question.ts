const createQuestionRules = {
  title: "required|string",
  description: "required|string",
  difficulty: "required|string",
  topic: "required|string",
  hints: "array",
  "examples.*.input": "string",
  "examples.*.output": "string",
  constraints: "array",
  solution: "required|string",
  recommended_duration: "integer",
};

export default createQuestionRules;
