import axiosInstance from "../utils/axiosInstance";

const path = "/products";

export const getProduct = async () => {
  const res = await axiosInstance.get(`${path}/get`);
  return res.data;
};
export const getProductById = async (id: number) => {
  const res = await axiosInstance.get(`${path}/id/${id}`);
  return res.data;
};
export const getProductByName = async (name: string) => {
  const res = await axiosInstance.get(`${path}/name/${name}`);
  return res.data;
};

export const getProductTypeName = async (productTypeName: string) => {
  const res = await axiosInstance.get(
    `${path}/productTypeName/${productTypeName}`
  );
  return res.data;
};

export const add = async <Product>(product: Product): Promise<Product> => {
  const res = await axiosInstance.post<Product>(`${path}/add`, product);
  return res.data;
};
