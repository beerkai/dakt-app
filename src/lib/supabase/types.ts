export type AnalystColor = "mavi" | "sari" | "yesil" | "mor" | "turuncu";

export interface Profile {
  id: string;
  username: string;
  color: AnalystColor;
  created_at: string;
  updated_at: string;
}

export interface SolvedCase {
  id: string;
  user_id: string;
  case_id: string;
  accuracy: number;
  attempt_count: number;
  duration_seconds: number;
  solved_at: string;
}
