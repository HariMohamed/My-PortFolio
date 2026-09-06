import { retrieveKnowledge } from "../assistant/knowledge/retrieveKnowledge";
import { generateDeterministicResponse } from "../assistant/responses/generateDeterministicResponse";

export function resolvePortfolioQuestion(input, contextProject = null, pageContext = {}) {
  const retrieval = retrieveKnowledge({ query: input, context: { project: contextProject, pageContext } });
  return generateDeterministicResponse({ query: input, retrieval, contextProject });
}

export { retrieveKnowledge } from "../assistant/knowledge/retrieveKnowledge";
