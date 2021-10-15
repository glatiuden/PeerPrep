const updateMatchRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  // partner1_id: ["regex:/^[0-9a-fA-F]{24}$/i"], // By right, partner1_id should be fixed
  partner2_id: ["regex:/^[0-9a-fA-F]{24}$/i"],
  // question_id: ["regex:/^[0-9a-fA-F]{24}$/i"], // By right, question should be fixed
  status: ["in:waiting,in-progress,completed,cancelled"],
};

export default updateMatchRules;
