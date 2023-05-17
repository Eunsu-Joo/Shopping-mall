import * as process from "process";

export const BASE_URL =
  process.env.NODE_ENV == "production"
    ? "http://localhost:8000"
    : "https://shoppingmall-back.herokuapp.com";
