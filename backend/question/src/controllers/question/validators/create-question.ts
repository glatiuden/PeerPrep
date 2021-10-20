const createQuestionRules = {
  title: "required|string",
  description: "required|string",
  difficulty: "required|string",
  topic: "required|string",
  hint: "required|string",
  "examples.*.input": "string",
  "examples.*.output": "string",
  constraints: "array",
  solution: "required|string",
};

export default createQuestionRules;
