/**
 * Page content from the design handoff. Numbers, names, account IDs and code
 * identifiers are illustrative placeholders to confirm with product before launch.
 */

export const palette = ["#F0503C", "#2B4BF2", "#F2A93B", "#1E9E6A", "#8B5CF6", "#101114", "#0EA5B7"];
export const TAIL = "#D9D9D3";

export const severityColor = {
  "Consumer harm": "#D9402D",
  Regulatory: "#B7791F",
  Volume: "#85888F",
} as const;

export type RootCause = {
  name: string;
  accounts: number;
  severity: keyof typeof severityColor;
  firstSeen: string;
  owner: string;
  hypothesis: string;
  fix: string;
};

export const rootCauses: RootCause[] = [
  {
    name: "Delinquency date resets after forbearance",
    accounts: 2318,
    severity: "Consumer harm",
    firstSeen: "2026-06",
    owner: "A. Chen",
    hypothesis:
      "The date an auto loan first went late gets reset when the borrower leaves forbearance. First seen two days after system release 8.4.",
    fix: "map_delinquency.reage()",
  },
  {
    name: "Paid accounts still showing a balance",
    accounts: 1904,
    severity: "Consumer harm",
    firstSeen: "2026-03",
    owner: "J. Morales",
    hypothesis: "Accounts are marked paid in full when a payoff quote is generated, before the final payment posts.",
    fix: "status_derivation.payoff()",
  },
  {
    name: "Charged-off accounts missing the amount",
    accounts: 987,
    severity: "Consumer harm",
    firstSeen: "2026-08",
    owner: "R. Patel",
    hypothesis: "The charge-off amount was lost when an acquired card portfolio was moved onto the main system.",
    fix: "migration_v2.chargeoff_amt",
  },
  {
    name: "Active-duty protection flag missing",
    accounts: 1212,
    severity: "Regulatory",
    firstSeen: "2025-11",
    owner: "Unassigned",
    hypothesis:
      "The military status check finds active-duty borrowers, but that flag never reaches the file sent to the bureaus.",
    fix: "cii_map.scra",
  },
  {
    name: "Payment history rewritten after system change",
    accounts: 388,
    severity: "Regulatory",
    firstSeen: "2026-02",
    owner: "L. Ortiz",
    hypothesis: "A system conversion filled in 24 months of payment history with the current status instead of what actually happened.",
    fix: "conversion.php_backfill",
  },
  {
    name: "Sold accounts dropped with no transfer code",
    accounts: 642,
    severity: "Regulatory",
    firstSeen: "2026-01",
    owner: "Unassigned",
    hypothesis: "Accounts sold to a debt buyer disappear from the file with nothing saying they were closed or transferred.",
    fix: "sale_events.close()",
  },
  {
    name: "Joint accounts reported as individual",
    accounts: 431,
    severity: "Volume",
    firstSeen: "2025-09",
    owner: "Unassigned",
    hypothesis: "Accounts with a co-borrower are coded as having one borrower, even though the co-borrower is listed in the same record.",
    fix: "ecoa_map.joint",
  },
];

const TOTAL_EXCEPTIONS = 11402;
const DOT_COUNT = 144;

/** Which root cause each dot belongs to, or -1 for the long tail. Stable between renders. */
export const dotCauses: number[] = Array.from({ length: DOT_COUNT }, (_, i) => {
  const x = ((i * 9301 + 49297) % 233280) / 233280;
  let cumulative = 0;
  for (let j = 0; j < rootCauses.length; j++) {
    cumulative += rootCauses[j].accounts / TOTAL_EXCEPTIONS;
    if (x < cumulative) return j;
  }
  return -1;
});

export const stats = [
  { value: "100%", label: "of reported accounts tested, every month" },
  { value: "14 days", label: "from files to first audit report" },
  { value: "0", label: "integrations needed to start" },
  { value: "Read-only", label: "never changes your systems" },
];

/** Bar heights are qualitative, not data. */
export const costBars = [
  { label: "Before the file ships", who: "Parity, before sending", height: "5%", color: "#2B4BF2", tag: "PARITY" },
  { label: "Within one month", who: "Parity, monitoring", height: "9%", color: "#2B4BF2", tag: "PARITY" },
  { label: "Consumer dispute", who: "Filed through e-OSCAR", height: "34%", color: "#C9CAC4", tag: "" },
  { label: "CFPB complaint", who: "Public complaint portal", height: "56%", color: "#C9CAC4", tag: "" },
  { label: "Exam finding", who: "Regulator", height: "80%", color: "#F0503C", tag: "" },
  { label: "Enforcement", who: "Penalties and refunds", height: "100%", color: "#F0503C", tag: "" },
];

export const complaintSource = {
  label: "CFPB 2025 Consumer Response Annual Report, via Orrick",
  url: "https://infobytes.orrick.com/2026-04-10/cfpb-reports-complaint-volume-doubled-in-2025-citing-surge-in-credit-reporting-disputes/",
};

export const notesLeft = [
  { i: "1", title: "A rule fails", body: "One check fails on 2,318 tradelines, or reported accounts. The same data and the same rule always give the same result." },
  { i: "2", title: "The agent finds the pattern", body: "The failures have things in common: auto loans, opened before 2024, recently out of forbearance." },
  { i: "3", title: "It lines up with a change", body: "The problem first appears in the month right after system release 8.4." },
];

export const notesRight = [
  { i: "4", title: "Evidence you can check", body: "Sample accounts show the date of first delinquency (DOFD), which sets how long negative marks stay on a credit report, next to what was reported." },
  { i: "5", title: "A place to fix it", body: "Your data team gets the likely source of the problem." },
  { i: "6", title: "Verified next month", body: "Parity confirms 2,301 accounts now report correctly and flags the other 17." },
];

export const sparkValues = [0, 0, 0, 0, 0, 0, 0, 412, 880, 1390, 1870, 2318];
export const SPARK_RELEASE_INDEX = 7;

export const traits = ["Auto loans", "Opened before 2024", "Left forbearance"];

export const evidence = [
  { acct: "****7731", expected: "2025-02-01", reported: "2026-06-01" },
  { acct: "****1408", expected: "2024-11-01", reported: "2026-07-01" },
];

export const matrixColumns = ["1 MONTH OF FILES", "2+ MONTHS", "3+ MONTHS", "YOUR LOAN SYSTEM", "ACCOUNT EVENTS"];

export const matrix = [
  {
    name: "Does each record make sense?",
    example: "A charged-off account with no amount, or a closed date on an open account.",
    cells: [1, 0, 0, 0, 0],
  },
  {
    name: "Does it match last month?",
    example: "Dates that change when they shouldn't, accounts that skip from 30 to 90 days late, payment history rewritten.",
    cells: [0, 1, 0, 0, 0],
  },
  {
    name: "Did a whole group suddenly change?",
    example: "Reporting patterns shift after a system update, or one group of accounts stops matching the rest.",
    cells: [0, 0, 1, 0, 0],
  },
  {
    name: "Does it match your own records?",
    example: "Paid on time but reported late, or a balance that differs from your books.",
    cells: [1, 0, 0, 1, 0],
  },
  {
    name: "Were special situations handled correctly?",
    example: "Forbearance, disaster relief, military protections, identity theft and settlements.",
    cells: [0, 0, 0, 1, 1],
  },
];

export type LaborRole = "Decides" | "Assists" | "Leads" | "Proposes" | "—";

export const labor: { task: string; rules: LaborRole; agents: LaborRole }[] = [
  { task: "Pass or fail on each check", rules: "Decides", agents: "—" },
  { task: "Working out the correct values", rules: "Decides", agents: "—" },
  { task: "Grouping errors into root causes", rules: "Assists", agents: "Leads" },
  { task: "Explaining the likely cause", rules: "—", agents: "Leads" },
  { task: "Connecting to your data", rules: "—", agents: "Proposes" },
  { task: "Drafting rules when guidance changes", rules: "—", agents: "Proposes" },
];

export const guardrails = [
  { n: "i.", text: "AI never changes whether a check passed or failed." },
  { n: "ii.", text: "Every AI explanation points to the specific accounts and fields behind it." },
  { n: "iii.", text: "A person approves every rule change, and every version is kept." },
  { n: "iv.", text: "Every AI explanation is logged, so it can be checked and rebuilt later." },
];

const phaseColors = ["#8EA2FF", "#2B4BF2", "#8B5CF6", "#F2F3F5"];

export const days = Array.from({ length: 15 }, (_, d) => ({
  label: `D${d}`,
  color: phaseColors[d === 0 ? 0 : d <= 6 ? 1 : d <= 12 ? 2 : 3],
}));

export const phases = [
  { date: "DAY 0", title: "Intake", body: "Files arrive under NDA through a secure file drop.", color: phaseColors[0] },
  { date: "DAYS 1–6", title: "Automated checks", body: "Every record is checked on its own, against earlier months, and against similar accounts.", color: phaseColors[1] },
  { date: "DAYS 7–12", title: "Root cause analysis", body: "Errors are grouped into root causes and reviewed by an expert.", color: phaseColors[2] },
  { date: "DAYS 13–14", title: "Report", body: "What was checked, the top root causes, the accounts affected, how serious each one is, and suggested fixes.", color: phaseColors[3] },
];

export const roles = [
  {
    role: "Credit reporting managers",
    need: "A ranked list of what is wrong, why, and how to fix it.",
    gets: [
      "A root cause queue ranked by consumer harm",
      "Owner assignment and recorded decisions",
      "Confirmation the next month that each fix worked",
    ],
  },
  {
    role: "Compliance",
    need: "Confidence the portfolio is accurate, and proof for examiners.",
    gets: [
      "Proof for examiners, ready for any time period",
      "Accuracy tracked over time",
      "The option to run audits through your lawyers",
    ],
  },
  {
    role: "Internal audit",
    need: "Independent, reproducible test results we can stand behind.",
    gets: [
      "Every finding tied to the exact rule that produced it",
      "Any past result can be reproduced",
      "A permanent log of every action and decision",
    ],
  },
  {
    role: "Engineering & data",
    need: "Root causes tied to the exact rule, field and release.",
    gets: [
      "Suggestions for where to make each fix",
      "Test runs before system updates and migrations",
      "Alerts when a root cause comes back",
    ],
  },
];

export const security = [
  { key: "DEPLOYMENT", title: "Private to you", body: "Use a private hosted copy, or run Parity inside your own cloud so data never leaves it." },
  { key: "ACCESS", title: "Read-only", body: "Parity never changes your systems or what you send to the bureaus." },
  { key: "DATA PROTECTION", title: "Encrypted end to end", body: "Encryption in transit and in storage, extra protection for SSNs and other identifiers, and retention you control." },
  { key: "MODELS", title: "No training on your data", body: "Customer data is never used to train shared models." },
  { key: "CERTIFICATION", title: "SOC 2", body: "An independent security audit: Type I before our first monitoring customer, Type II within 12 months." },
  { key: "RECORDS", title: "Permanent logs", body: "Every action, decision, rule change and AI explanation is logged and can be reviewed." },
];
