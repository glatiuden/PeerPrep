const updateMatchRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  partner2_id: ["regex:/^[0-9a-fA-F]{24}$/i"],
  status: ["in:waiting,in-progress,completed,cancelled"],
};

export default updateMatchRules;
