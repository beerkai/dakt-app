import type { PlayerStampKind } from "@/lib/case-types";

export type RoomItemMark = {
  user_id: string;
  item_id: string;
  mark_kind: PlayerStampKind;
  username: string;
  user_color: string;
  updated_at: string;
};

export const ROOM_MARK_KINDS: PlayerStampKind[] = [
  "supheli",
  "ele-alindi",
  "elendi",
];

export function isRoomMarkKind(value: string): value is PlayerStampKind {
  return (ROOM_MARK_KINDS as readonly string[]).includes(value);
}
