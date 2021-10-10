const createMatchRules = {
  match_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  // content: "required|string",
};

export default createMatchRules;
