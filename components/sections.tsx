import type { ReactNode } from "react";
import { links } from "@/lib/config";
import {
  SPARK_RELEASE_INDEX,
  complaintSource,
  costBars,
  days,
  evidence,
  guardrails,
  labor,
  matrix,
  matrixColumns,
  notesLeft,
  notesRight,
  phases,
  security,
  sparkValues,
  stats,
  traits,
  type LaborRole,
} from "@/lib/content";
import { Roles } from "./Roles";

function Section({
  id,
  number,
  title,
  tone,
  children,
}: {
  id?: string;
  number: string;
  title: string;
  tone?: "warm" | "rule" | "tint" | "dark";
  children: ReactNode;
}) {
  return (
    <section id={id} className={tone ? `section section--${tone}` : "section"}>
      <div className="section__inner">
        <div className="label">
          <div className="label__number">{number}</div>
          <div className="label__title">{title}</div>
        </div>
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
}

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#top" className="logo">
          <div className="logo__mark" />
          <span className="logo__word">Parity</span>
        </a>
        <nav className="nav" aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#audit">Audit</a>
          <a href="#security">Security</a>
          <a href="#company">Company</a>
        </nav>
        <div className="header__actions">
          <a href={links.signIn} className="header__signin">
            Sign in
          </a>
          <a href="#audit" className="header__cta">
            Request an audit
          </a>
        </div>
      </div>
    </header>
  );
}

export function Stats() {
  return (
    <section className="stats" aria-label="At a glance">
      <div className="stats__grid">
        {stats.map((s) => (
          <div key={s.value} className="stat">
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CostOfDelay() {
  return (
    <Section number="01" title="When errors get found">
      <h2 className="h2 cost__title">Every month an error goes unnoticed, it costs more to fix.</h2>
      <div className="scroll-x">
        <div className="cost__wrap">
          <div className="cost__chart">
            <div className="cost__axis">RELATIVE COST TO REMEDIATE ↑</div>
            {costBars.map((bar) => (
              <div key={bar.label} className="cost__col">
                <div className="cost__tag">{bar.tag}</div>
                <div className="cost__bar" style={{ height: bar.height, background: bar.color }} />
              </div>
            ))}
          </div>
          <div className="cost__labels">
            {costBars.map((bar) => (
              <div key={bar.label} className="cost__label">
                <div className="cost__name">{bar.label}</div>
                <div className="cost__who">{bar.who}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cost__notes">
        <p>
          Most lenders check that their credit reporting files are formatted correctly, then spot-check a small sample
          once a year. The real errors hide in unusual situations like bankruptcy, forbearance, military service,
          settlements and sold accounts.
        </p>
        <p>
          System updates, conversions and portfolio sales can quietly change how account data gets reported. The error
          then repeats every month until a consumer or an examiner finds it.
        </p>
        <div className="big-stat">
          <div className="big-stat__value">5.8M</div>
          <div className="big-stat__text">
            credit reporting complaints to the CFPB in 2025, 88% of all complaints it received.
          </div>
          <div className="big-stat__source">
            Source:{" "}
            <a href={complaintSource.url} target="_blank" rel="noopener noreferrer">
              {complaintSource.label}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Notes({ items }: { items: typeof notesLeft }) {
  return (
    <div className="notes">
      {items.map((n) => (
        <div key={n.i} className="note">
          <span className="note__marker">{n.i}</span>
          <div>
            <div className="note__title">{n.title}</div>
            <div className="note__body">{n.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Marker({ n }: { n: number }) {
  return <span className="marker">{n}</span>;
}

function FindingCard() {
  const peak = Math.max(...sparkValues);
  return (
    <div className="card">
      <div className="card__head">
        <span className="card__id">RC-0412</span>
        <span className="card__pill">CONSUMER HARM</span>
      </div>
      <div className="card__body">
        <div className="card__title">Delinquency date resets after forbearance</div>
        <div className="card__line">
          <Marker n={1} />
          <span>XC-007 v3.1</span>
          <span className="fail">FAIL × 2,318</span>
        </div>
        <div className="card__line card__line--wrap">
          <Marker n={2} />
          {traits.map((t) => (
            <span key={t} className="trait">
              {t}
            </span>
          ))}
        </div>
        <div className="card__line card__line--top">
          <Marker n={3} />
          <div className="spark-wrap">
            <div className="spark" aria-hidden="true">
              {sparkValues.map((v, i) => (
                <div
                  key={i}
                  className="spark__bar"
                  style={{
                    height: v ? `${Math.round((v / peak) * 100)}%` : "2px",
                    background: v ? "#F0503C" : "#D9D9D3",
                    borderLeft: i === SPARK_RELEASE_INDEX ? "2px solid #101114" : undefined,
                  }}
                />
              ))}
            </div>
            <div className="spark__axis">
              <span>2025-11</span>
              <strong>▲ release 8.4 · Jun 3</strong>
              <span>2026-10</span>
            </div>
          </div>
        </div>
        <div className="card__line card__line--top">
          <Marker n={4} />
          <div className="evidence">
            <div className="evidence__row evidence__row--head">
              <span>ACCT</span>
              <span>EXPECTED DOFD</span>
              <span>REPORTED</span>
            </div>
            {evidence.map((e) => (
              <div key={e.acct} className="evidence__row">
                <span>{e.acct}</span>
                <span>{e.expected}</span>
                <span className="fail">{e.reported}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card__line">
          <Marker n={5} />
          <span className="fix-label">fix →</span>
          <span className="fix-chip">map_delinquency.reage()</span>
        </div>
        <div className="card__line">
          <Marker n={6} />
          <div className="verify" aria-hidden="true">
            <div className="verify__ok" />
            <div className="verify__bad" />
          </div>
          <span className="verify__label">99.3% cleared</span>
        </div>
      </div>
    </div>
  );
}

export function Anatomy() {
  return (
    <Section id="how" number="02" title="Anatomy of a root cause" tone="warm">
      <h2 className="h2 anatomy__title">Thousands of failed checks, one explanation, one fix.</h2>
      <p className="intro anatomy__intro">
        This is what a single Parity root cause looks like, from the rule that failed to the month that confirmed the
        fix.
      </p>
      <div className="anatomy">
        <Notes items={notesLeft} />
        <FindingCard />
        <Notes items={notesRight} />
      </div>
    </Section>
  );
}

export function Coverage() {
  return (
    <Section number="03" title="What gets checked" tone="rule">
      <h2 className="h2">Start with the files you already send. Add more data to unlock deeper checks.</h2>
      <p className="intro coverage__intro">
        Three kinds of checks run on the Metro 2 files you already send to the bureaus. Connecting your loan system lets
        Parity compare those files with what actually happened on each account.
      </p>
      <div className="scroll-x">
        <div className="matrix">
          <div className="matrix__grid matrix__group">
            <div />
            <div className="matrix__audit">HISTORICAL AUDIT · FILES ONLY</div>
            <div className="matrix__monitoring">CONTINUOUS MONITORING</div>
          </div>
          <div className="matrix__grid matrix__columns">
            <div>TYPE OF CHECK</div>
            {matrixColumns.map((c) => (
              <div key={c}>{c}</div>
            ))}
          </div>
          {matrix.map((row) => (
            <div key={row.name} className="matrix__grid matrix__row">
              <div>
                <div className="matrix__name">{row.name}</div>
                <div className="matrix__example">{row.example}</div>
              </div>
              {row.cells.map((on, i) => (
                <div key={i} className="matrix__cell">
                  <div
                    className={on ? "matrix__dot matrix__dot--on" : "matrix__dot"}
                    role="img"
                    aria-label={`${matrixColumns[i].toLowerCase()}: ${on ? "required" : "not required"}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function RolePill({ value }: { value: LaborRole }) {
  return <span className={value === "—" ? "pill pill--none" : `pill pill--${value}`}>{value}</span>;
}

export function DivisionOfLabor() {
  return (
    <Section number="04" title="Who does what" tone="tint">
      <h2 className="h2 labor__title">Rules decide what&apos;s wrong. Agents explain why.</h2>
      <div className="labor">
        <div className="labor__row labor__row--head">
          <span>RESPONSIBILITY</span>
          <span>FIXED RULES</span>
          <span>AI AGENTS</span>
        </div>
        {labor.map((row) => (
          <div key={row.task} className="labor__row">
            <span className="labor__task">{row.task}</span>
            <span className="labor__cell">
              <span className="labor__who">Rules</span>
              <RolePill value={row.rules} />
            </span>
            <span className="labor__cell">
              <span className="labor__who">Agents</span>
              <RolePill value={row.agents} />
            </span>
          </div>
        ))}
      </div>
      <div className="guardrails">
        {guardrails.map((g) => (
          <div key={g.n} className="guardrail">
            <span>{g.n}</span>
            {g.text}
          </div>
        ))}
      </div>
    </Section>
  );
}

export function HistoricalAudit() {
  return (
    <Section id="audit" number="05" title="Historical audit" tone="dark">
      <h2 className="h2">Files in. Findings out. 14 days.</h2>
      <p className="intro audit__intro">
        Send us 12 to 24 months of the Metro 2 files you already send to the bureaus, under NDA. There&apos;s nothing to
        integrate, and a credit reporting expert reviews the report before it reaches you.
      </p>
      <div className="scroll-x days-wrap">
        <div className="days" aria-hidden="true">
          {days.map((d) => (
            <div key={d.label}>
              <div className="day__block" style={{ background: d.color }} />
              <div className="day__label">{d.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="phases">
        {phases.map((p) => (
          <div key={p.title} className="phase" style={{ borderTopColor: p.color }}>
            <div className="phase__date">{p.date}</div>
            <div className="phase__title">{p.title}</div>
            <div className="phase__body">{p.body}</div>
          </div>
        ))}
      </div>
      <div className="audit__cta">
        <div className="audit__buttons">
          <a href={links.requestAudit} className="btn btn--primary">
            Request a historical audit
          </a>
          <a href={links.sampleReport} className="btn btn--dark-outline">
            View a sample report
          </a>
        </div>
        <span className="audit__note">Can be run through your lawyers to keep it privileged.</span>
      </div>
    </Section>
  );
}

export function WhoUsesIt() {
  return (
    <Section number="06" title="Who uses it">
      <Roles />
    </Section>
  );
}

export function Security() {
  return (
    <Section id="security" number="07" title="Security" tone="warm">
      <h2 className="h2 security__title">Built for files full of SSNs.</h2>
      <div className="spec">
        {security.map((s) => (
          <div key={s.key} className="spec__row">
            <span className="spec__key">{s.key}</span>
            <div className="spec__text">
              <div className="spec__title">{s.title}</div>
              <div className="spec__body">{s.body}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <section className="final">
      <div className="final__inner">
        <div>
          <h2>Find it before the dispute does.</h2>
          <p>Start with a fixed-fee historical audit. The report arrives in 14 days.</p>
        </div>
        <div className="final__buttons">
          <a href={links.requestAudit} className="btn btn--cta btn--white">
            Request a historical audit
          </a>
          <a href={links.talkToTeam} className="btn btn--cta btn--blue-outline">
            Talk to our team
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="company" className="footer">
      <div className="footer__inner">
        <div className="footer__logo">
          <div className="footer__mark" />
          <span className="footer__word">Parity</span>
        </div>
        <div className="footer__links">
          <a href="#how">How it works</a>
          <a href="#audit">Audit</a>
          <a href="#security">Security</a>
          <a href={links.careers}>Careers</a>
          <a href={links.privacy}>Privacy</a>
        </div>
        <span>Parity reports findings. You decide. © 2026</span>
      </div>
    </footer>
  );
}
