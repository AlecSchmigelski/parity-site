/**
 * Flags from the handoff. Set at build time, e.g. NEXT_PUBLIC_HERO_VISUAL=collapse.
 */
export const config = {
  heroVisual: process.env.NEXT_PUBLIC_HERO_VISUAL === "collapse" ? "collapse" : "queue",
  autoCycle: process.env.NEXT_PUBLIC_AUTO_CYCLE !== "false",
  showStats: process.env.NEXT_PUBLIC_SHOW_STATS !== "false",
} as const;

/**
 * Destinations the handoff leaves as TBD. Each one is "#" until it exists, so
 * every call to action can be wired up here.
 */
export const links = {
  signIn: "#",
  requestAudit: "#",
  sampleReport: "#",
  talkToTeam: "#",
  careers: "#",
  privacy: "#",
};
