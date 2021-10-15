const createMatchRules = {
  partner1_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  // partner2_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  question_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  status: ["required", "in:waiting,in-progress,completed,cancelled"],
};

export default createMatchRules;
