const updateChatRules = {
  _id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  "content.*.user_id": ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  "content.*.message": "required|string",
  "content.*.time_sent": "date",
};

export default updateChatRules;
