const createMatchRules = {
  // match_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  user_name: "required|string",
  partner_name: "required|string",
  user_email: "required|string",
  partner_email: "required|string",
  difficulty_level: "required|string",
  topic_chosen: "required|string",
  question: "required|string"
};

export default createMatchRules;
