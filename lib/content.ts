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
    name: "DOFD resets after forbearance exit",
    accounts: 2318,
    severity: "Consumer harm",
    firstSeen: "2026-06",
    owner: "A. Chen",
    hypothesis:
      "Re-aging logic resets DOFD when auto loans exit forbearance. First seen two days after core release 8.4.",
    fix: "map_delinquency.reage()",
  },
  {
    name: "Status 13 reported with balance > 0",
    accounts: 1904,
    severity: "Consumer harm",
    firstSeen: "2026-03",
    owner: "J. Morales",
    hypothesis: "Paid-in-full status is set when a payoff quote is generated, before the final payment posts.",
    fix: "status_derivation.payoff()",
  },
  {
    name: "Charge-off amount zero on status 97",
    accounts: 987,
    severity: "Consumer harm",
    firstSeen: "2026-08",
    owner: "R. Patel",
    hypothesis: "Original charge-off amount was dropped for accounts migrated from the acquired card portfolio.",
    fix: "migration_v2.chargeoff_amt",
  },
  {
    name: "SCRA indicator missing on active duty",
    accounts: 1212,
    severity: "Regulatory",
    firstSeen: "2025-11",
    owner: "Unassigned",
    hypothesis:
      "The active-duty flag from the military status check is not mapped to the Consumer Information Indicator (CII) field.",
    fix: "cii_map.scra",
  },
  {
    name: "Payment history rewritten after conversion",
    accounts: 388,
    severity: "Regulatory",
    firstSeen: "2026-02",
    owner: "L. Ortiz",
    hypothesis: "Core conversion backfilled the 24-month payment profile with current status instead of history.",
    fix: "conversion.php_backfill",
  },
  {
    name: "Sold accounts missing transfer code",
    accounts: 642,
    severity: "Regulatory",
    firstSeen: "2026-01",
    owner: "Unassigned",
    hypothesis: "Accounts sold to a debt buyer drop out of the file without a closure or transfer code.",
    fix: "sale_events.close()",
  },
  {
    name: "ECOA code conflicts with J1 segment",
    accounts: 431,
    severity: "Volume",
    firstSeen: "2025-09",
    owner: "Unassigned",
    hypothesis: "Joint accounts report ECOA code 1 (individual) while a J1 associated-consumer segment is present.",
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
  { value: "100%", label: "of tradelines tested, every cycle" },
  { value: "14 days", label: "from files to first audit report" },
  { value: "0", label: "integrations needed to start" },
  { value: "Read-only", label: "never writes to your systems" },
];

/** Bar heights are qualitative, not data. */
export const costBars = [
  { label: "Before the file ships", who: "Parity, pre-transmission", height: "5%", color: "#2B4BF2", tag: "PARITY" },
  { label: "Within one cycle", who: "Parity, monitoring", height: "9%", color: "#2B4BF2", tag: "PARITY" },
  { label: "Consumer dispute", who: "ACDV through e-OSCAR", height: "34%", color: "#C9CAC4", tag: "" },
  { label: "CFPB complaint", who: "Public complaint portal", height: "56%", color: "#C9CAC4", tag: "" },
  { label: "Exam finding", who: "Regulator", height: "80%", color: "#F0503C", tag: "" },
  { label: "Enforcement", who: "Consent order, restitution", height: "100%", color: "#F0503C", tag: "" },
];

export const complaintSource = {
  label: "CFPB 2025 Consumer Response Annual Report, via Orrick",
  url: "https://infobytes.orrick.com/2026-04-10/cfpb-reports-complaint-volume-doubled-in-2025-citing-surge-in-credit-reporting-disputes/",
};

export const notesLeft = [
  { i: "1", title: "A rule fails", body: "XC-007 fails on 2,318 tradelines. Same inputs and same rule version always give the same result." },
  { i: "2", title: "The agent finds the pattern", body: "The failures share traits: auto loans, originated before 2024, recently exited forbearance." },
  { i: "3", title: "It lines up with a change", body: "The cluster first appears in the cycle right after core release 8.4." },
];

export const notesRight = [
  { i: "4", title: "Evidence you can check", body: "Sample accounts with expected and reported values. Every claim cites its accounts and fields." },
  { i: "5", title: "A place to fix it", body: "The likely mapping rule is identified for your data owner." },
  { i: "6", title: "Verified next cycle", body: "Parity confirms 2,301 accounts now report correctly and re-queues the other 17." },
];

export const sparkValues = [0, 0, 0, 0, 0, 0, 0, 412, 880, 1390, 1870, 2318];
export const SPARK_RELEASE_INDEX = 7;

export const traits = ["Auto loans", "Originated pre-2024", "Exited forbearance"];

export const evidence = [
  { acct: "****7731", expected: "2025-02-01", reported: "2026-06-01" },
  { acct: "****1408", expected: "2024-11-01", reported: "2026-07-01" },
];

export const matrixColumns = ["1 MONTH OF FILES", "2+ MONTHS", "3+ MONTHS", "SYSTEM OF RECORD", "EVENT DATA"];

export const matrix = [
  {
    name: "Within-record consistency",
    example: "Status conflicts with payment rating, charge-off with no amount, closed date on an open account.",
    cells: [1, 0, 0, 0, 0],
  },
  {
    name: "Across-cycle consistency",
    example: "DOFD changes when it should not, statuses skip steps, payment history rewritten.",
    cells: [0, 1, 0, 0, 0],
  },
  {
    name: "Population anomalies",
    example: "Code distributions shift after a release, a cohort diverges from its peers.",
    cells: [0, 0, 1, 0, 0],
  },
  {
    name: "Source-of-truth reconciliation",
    example: "Paid on time but reported late, balance differs from the ledger.",
    cells: [1, 0, 0, 1, 0],
  },
  {
    name: "Event and policy correctness",
    example: "Forbearance, disaster and SCRA accommodations, identity theft blocks, settlements.",
    cells: [0, 0, 0, 1, 1],
  },
];

export type LaborRole = "Decides" | "Assists" | "Leads" | "Proposes" | "—";

export const labor: { task: string; rules: LaborRole; agents: LaborRole }[] = [
  { task: "Pass or fail on each check", rules: "Decides", agents: "—" },
  { task: "Expected values in replay", rules: "Decides", agents: "—" },
  { task: "Grouping exceptions into root causes", rules: "Assists", agents: "Leads" },
  { task: "Cause hypotheses and explanations", rules: "—", agents: "Leads" },
  { task: "Onboarding field mapping", rules: "—", agents: "Proposes" },
  { task: "Drafting new rules from guidance updates", rules: "—", agents: "Proposes" },
];

export const guardrails = [
  { n: "i.", text: "No agent output changes a finding's pass or fail status." },
  { n: "ii.", text: "Every agent claim cites the accounts and fields it is based on." },
  { n: "iii.", text: "Rule and mapping changes need human approval and are versioned." },
  { n: "iv.", text: "Agent outputs are logged with the model version and inputs, so any explanation can be rebuilt." },
];

const phaseColors = ["#8EA2FF", "#2B4BF2", "#8B5CF6", "#F2F3F5"];

export const days = Array.from({ length: 15 }, (_, d) => ({
  label: `D${d}`,
  color: phaseColors[d === 0 ? 0 : d <= 6 ? 1 : d <= 12 ? 2 : 3],
}));

export const phases = [
  { date: "DAY 0", title: "Intake", body: "Files arrive under NDA through a secure file drop.", color: phaseColors[0] },
  { date: "DAYS 1–6", title: "File-only checks", body: "Within-record, across-cycle and population tests on every record.", color: phaseColors[1] },
  { date: "DAYS 7–12", title: "Root cause analysis", body: "Exceptions are grouped into root causes and reviewed by an expert.", color: phaseColors[2] },
  { date: "DAYS 13–14", title: "Report", body: "Coverage, top root causes, affected populations, severity and suggested fixes.", color: phaseColors[3] },
];

export const roles = [
  {
    role: "Credit reporting managers",
    need: "A ranked list of what is wrong, why, and how to fix it.",
    gets: [
      "A root cause queue ranked by consumer harm",
      "Owner assignment and recorded decisions",
      "Next-cycle verification that each fix worked",
    ],
  },
  {
    role: "Compliance",
    need: "Confidence the portfolio is accurate, and proof for examiners.",
    gets: [
      "An exam-ready evidence package for any period",
      "Coverage and precision tracked over time",
      "Privileged engagements through counsel",
    ],
  },
  {
    role: "Internal audit",
    need: "Independent, reproducible test results we can stand behind.",
    gets: [
      "Every finding tied to a rule ID and version",
      "Any historical result replayed from stored inputs",
      "An immutable log of every action and decision",
    ],
  },
  {
    role: "Engineering & data",
    need: "Root causes tied to the exact rule, field and release.",
    gets: [
      "Suggested fix locations in the mapping logic",
      "Change-impact runs before releases and migrations",
      "Regression alerts when a root cause comes back",
    ],
  },
];

export const security = [
  { key: "DEPLOYMENT", title: "Single-tenant or your cloud", body: "Use a hosted single-tenant instance, or run Parity inside your cloud so data never leaves it." },
  { key: "ACCESS", title: "Read-only", body: "Parity never writes to source systems or bureau submissions." },
  { key: "DATA PROTECTION", title: "Encrypted end to end", body: "Encryption in transit and at rest, field-level protection for identifiers, and configurable retention." },
  { key: "MODELS", title: "Zero retention", body: "Customer data is never used to train shared models." },
  { key: "ATTESTATION", title: "SOC 2", body: "Type I before the first continuous customer, Type II within 12 months." },
  { key: "AUDITABILITY", title: "Immutable logs", body: "Every action, decision, rule change and agent output is logged and can be replayed." },
];
