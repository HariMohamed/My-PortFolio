export function rankResults(results = []) {
  return [...results].sort((a, b) => b.score - a.score).map((result, index) => ({ ...result, rank: index + 1 }));
}
