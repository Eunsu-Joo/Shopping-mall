import * as process from "process";

export const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8000"
    : "https://shoppingmall-back.herokuapp.com";
