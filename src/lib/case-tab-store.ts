import type { TabId } from "@/lib/case-types";

export type PublishedCaseTabs = {
  caseId: string;
  tabs: TabId[];
};

let current: PublishedCaseTabs | null = null;
const listeners = new Set<() => void>();

export function publishCaseTabs(next: PublishedCaseTabs | null) {
  current = next;
  listeners.forEach((listener) => listener());
}

export function subscribeCaseTabs(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCaseTabs(): PublishedCaseTabs | null {
  return current;
}
