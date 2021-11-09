const createRatingRules = {
  giver_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  match_id: ["required", "regex:/^[0-9a-fA-F]{24}$/i"],
  rating: "required|integer",
};

export default createRatingRules;
