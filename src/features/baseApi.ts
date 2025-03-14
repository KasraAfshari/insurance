import { BASE_URL } from "./baseUrl";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { endpoint }) => {
    if (endpoint === "getUser") {
      headers.set("X-Custom-Header", "some-value");
    }

    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  tagTypes: ["users", "userForms"],
  endpoints: () => ({}),
});
