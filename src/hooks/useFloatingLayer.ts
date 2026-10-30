"use client";

import { useEffect, type RefObject } from "react";

/**
 * Bottom floating layers on mobile (solo tease, install prompt, guest banner)
 * share the same slot above the tab bar. Only the highest-priority visible one
 * is shown (see `html[data-float-*]` rules in globals.css), and the page gets
 * `--app-float-inset` extra bottom padding so nothing stays hidden under it.
 */
export type FloatingLayerName = "tease" | "install" | "guest";

const PRIORITY: FloatingLayerName[] = ["tease", "install", "guest"];
const heights = new Map<FloatingLayerName, number>();

function sync() {
  const root = document.documentElement;
  for (const name of PRIORITY) {
    const key = `float${name[0].toUpperCase()}${name.slice(1)}`;
    if (heights.has(name)) root.dataset[key] = "1";
    else delete root.dataset[key];
  }
  const top = PRIORITY.find((n) => heights.has(n));
  if (top) {
    root.style.setProperty("--app-float-inset", `${Math.ceil(heights.get(top) ?? 0) + 12}px`);
  } else {
    root.style.removeProperty("--app-float-inset");
  }
}

export function useFloatingLayer(
  name: FloatingLayerName,
  ref: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    const measure = () => {
      heights.set(name, el.getBoundingClientRect().height);
      sync();
    };
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      heights.delete(name);
      sync();
    };
  }, [name, ref, active]);
}
