const createMatchRules = {
  partner1_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  question_id: "regex:/^[0-9a-fA-F]{24}$/i",
  programming_language: "string",
  mode: "required|in:timed,otot",
  is_random: "boolean",
};

export default createMatchRules;
