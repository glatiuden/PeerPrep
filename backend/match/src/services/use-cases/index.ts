import findMatch from "./find-match";
import cancelMatch from "./cancel-match";
import getMatch from "./get-match";

const matchUseCases = Object.freeze({
  findMatch,
  cancelMatch,
  getMatch,
});

export default matchUseCases;

export { findMatch, cancelMatch, getMatch };
