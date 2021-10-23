const updateEditorRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  programming_language: "string",
  content: "string",
};

export default updateEditorRules;
