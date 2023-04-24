import request, { RequestDocument } from "graphql-request";
import { BASE_URL } from "../constants/url";

const graphqlFetcher = (query: RequestDocument, variables = {}) => {
  return request(`${BASE_URL}/graphql`, query, variables, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL,
  });
};
export default graphqlFetcher;
