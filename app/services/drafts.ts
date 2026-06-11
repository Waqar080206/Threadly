import { api } from "./api";

export async function getLiveDrafts() {
  const response = await api.get(
    "/api/drafts/live"
  );

  return response.data;
}

export async function approveDraft(
  id: string
) {
  const response = await api.post(
    `/api/drafts/${id}/approve`
  );

  return response.data;
}