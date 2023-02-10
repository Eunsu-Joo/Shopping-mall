import { BASE_URL } from "../constants/url";

type AnyObj = {
  [key: string]: any;
};

type FetcherProps = {
  method: "GET" | "POST" | "DELETE" | "PUT" | "FETCH";
  path: string;
  body?: AnyObj;
  params?: AnyObj;
};

export const fetcher = async ({ method, body, path, params }: FetcherProps) => {
  try {
    let url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "content-Type": "application/json",
      },
    };
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    if (body) fetchOptions.body = JSON.stringify(body);
    const res = await fetch(url, fetchOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
