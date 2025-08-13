export const API_PATHS = {
  URL: {
    BASE: "http://localhost:8081"
  },
  AUTH: {
    BASE: "/auth",
    LOGIN: "/auth/login",
  },
  PRODUCTS: {
    BASE: "/products",
    GET: "/products/get",
    ADD: "/products/add",
    DELETE_BY_ID: (id: number) => `/products/delete/id/${id}`,
    UPDATE_PATCH_PRODUCT_BY_NAME: (name: string) =>
      `/products/update/name/${name}`,
  },
} as const;

export type apiPaths = typeof API_PATHS;
