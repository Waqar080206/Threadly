export type Candidate = {
  contact_id: string | null;
  name: string;
  company: string;
  warmth_score: number | null;
  owner: string;
  last_interaction: string | null;
  why: string;
  suggested_action:
    | "draft_intro"
    | "re_engage"
    | "review"
    | "none";
};

export type MasterConnectResponse = {
  summary: string;
  candidates: Candidate[];
  reasoning: string;
  omitted_red: number;
  mode: string;
  elapsed_ms: number;
};