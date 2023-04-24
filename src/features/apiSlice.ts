import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct} from "../interfaces/IProduct";
export const apiSlice = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getSingleProduct: builder.query<IProduct, string>({
      query: (id: string) => `/products/${id}`,
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),
    editProduct: builder.mutation({
      query: ({id, product}) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useEditProductMutation,
} = apiSlice;
