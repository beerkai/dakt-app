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

export type RoomStatus = "waiting" | "playing" | "solved" | "archived" | "terminated";

export interface Room {
  id: string;
  code: string;
  case_id: string;
  host_user_id: string;
  status: RoomStatus;
  created_at: string;
  started_at?: string;
  finished_at?: string;
  archived_at?: string;
}

export interface RoomPlayer {
  id: string;
  room_id: string;
  user_id: string;
  username: string;
  color: AnalystColor;
  is_ready: boolean;
  joined_at: string;
  left_at?: string;
}
