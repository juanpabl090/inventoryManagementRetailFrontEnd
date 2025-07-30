import axios from "axios";

const path = "/products/get";

export const getProduct = (JWT: string) => {
  axios.get(path, {
    headers: { Authorization: `Bearer ${JWT}` },
  });
};
export const getProductById = (JWT: string, id: number) => {
  axios.get(`${path}/id/${id}`, {
    headers: { Authorization: `Bearer ${JWT}` },
  });
};
export const getProductByName = (JWT: string, name: string) => {
  axios.get(`${path}/name/${name}`, {
    headers: { Authorization: `Bearer ${JWT}` },
  });
};

export const getProductTypeName = (JWT: string, productTypeName: string) => {
  axios.get(`${path}/productTypeName/${productTypeName}`, {
    headers: { Authorization: `Bearer ${JWT}` },
  });
};
