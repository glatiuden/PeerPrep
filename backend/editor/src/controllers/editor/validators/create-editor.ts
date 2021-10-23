const createEditorRules = {
  match_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  programming_language: "required|string",
  content: "required|string",
};

export default createEditorRules;
