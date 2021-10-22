const createMatchRules = {
  partner1_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  question_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  programming_languages: "required|array",
  mode: "required|in:timed,otot",
};

export default createMatchRules;
