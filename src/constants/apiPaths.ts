export const API_PATHS = {
  URL: {
    BASE: "http://localhost:8081",
  },
  AUTH: {
    BASE: "/auth",
    LOGIN: "/auth/login",
  },
  PRODUCTS: {
    BASE: "/products",
    GET: "/products/get",
    ALL: "/products/all",
    ADD: "/products/add",
    DELETE_BY_ID: (id: number) => `/products/delete/id/${id}`,
    UPDATE_PATCH_PRODUCT_BY_NAME: (name: string) =>
      `/products/update/name/${name}`,
  },
  CATEGORIES: {
    BASE: "/categories",
    ALL: "/categories/get",
    ADD: "/categories/add",
    DELETEBYID: (id: number) => `/categories/delete/id/${id}`,
    UPDATEBYID: (id: number) => `/categories/update/id/${id}`,
  },
  PRODUCT_TYPES: {
    BASE: "/ProductType",
    ALL: "/ProductType/get",
    ADD: "/ProductType/add",
    DELETEBYID: (id: number) => `/ProductType/delete/id/${id}`,
    UPDATEBYID: (id: number) => `/ProductType/update/id/${id}`,
  },
  SUPPLIERS: {
    BASE: "/suppliers",
    ALL: "/suppliers/get",
    ADD: "/suppliers/add",
    DELETEBYID: (id: number) => `/suppliers/delete/id/${id}`,
    UPDATEBYID: (id: number) => `/suppliers/update/id/${id}`,
  },
  PURCHASES: {
    BASE: "/purchase",
    ALL: "/purchase/all",
    ADD: "/purchase/registerPurchase",
  },
} as const;

export type apiPaths = typeof API_PATHS;
