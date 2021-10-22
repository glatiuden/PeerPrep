const updateUserRules = {
  display_name: "required|string",
  password: "required|string|min:8|confirmed",
};

export default updateUserRules;
