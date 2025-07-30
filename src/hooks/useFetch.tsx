import { useQuery } from "@tanstack/react-query";
import api from "../utils/axiosInstance";

type props = {
  path: string;
  JWT: string;
  model: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  body?: Record<string, unknown> | FormData;
};

export default function useFetch<T = unknown>({
  path,
  model,
  JWT,
  method,
  body,
}: props) {
  const fetch = async (): Promise<T[]> => {
    const headers = {
      Authorization: `Bearer ${JWT}`,
    };
    switch (method) {
      case "get": {
        const res = await api.get(path, { headers });
        return res.data;
      }
      case "post": {
        const res = await api.post(path, body, { headers });
        return res.data;
      }
      case "put": {
        const res = await api.post(path, body, { headers });
        return res.data;
      }
      case "patch": {
        const res = await api.patch(path, body, { headers });
        return res.data;
      }
      case "delete": {
        const res = await api.delete(path, { headers });
        return res.data;
      }
    }
  };

  const { data, error, isLoading } = useQuery<T[], Error>({
    queryKey: [model],
    queryFn: fetch,
  });

  return { data, isLoading, error };
}
