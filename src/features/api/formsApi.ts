import { baseApi } from "../baseApi";

export interface FormDataProps {
  id: string;
  "Full Name": string;
  Age: number;
  Gender: string;
  "Insurance Type": string;
  City: string;
}

export interface SubmissionFormsProps {
  columns: string[];
  data: FormDataProps[];
}

export const formsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query<SubmissionFormsProps, void>({
      query: () => ({
        url: "/api/insurance/forms/submissions",
      }),
      providesTags: ["userForms"],
    }),
  }),
});

export const { useGetFormsQuery } = formsApiSlice;
