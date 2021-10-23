const updateQuestionRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  title: "string",
  description: "string",
  difficulty: "string",
  topic: "string",
  hint: "string",
  "examples.*.input": "string",
  "examples.*.output": "string",
  constraints: "array",
  solution: "string",
};

export default updateQuestionRules;
