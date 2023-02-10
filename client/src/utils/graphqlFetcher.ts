import request, { RequestDocument } from "graphql-request";
import { BASE_URL } from "../constants/url";

const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(BASE_URL, query, variables);
export default graphqlFetcher;
