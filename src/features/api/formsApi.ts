import { baseApi } from "../baseApi";

interface FormData {
  id: string;
  "Full Name": string;
  Age: number;
  Gender: string;
  "Insurance Type": string;
  City: string;
}

interface FormsResponse {
  columns: string[];
  data: FormData[];
}

export const formsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query<FormsResponse, void>({
      query: () => ({
        url: "/api/insurance/forms/submissions",
      }),
      providesTags: ["userForms"],
    }),
  }),
});

export const { useGetFormsQuery } = formsApiSlice;
