import { api } from "./api";

export async function askMasterConnect(
  query: string,
  mode: string
) {
  const response = await api.post(
    "/api/master-connect",
    {
      query,
      mode,
    }
  );

  return response.data;
}