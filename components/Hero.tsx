"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import { TAIL, dotCauses, palette, rootCauses, severityColor } from "@/lib/content";

const CYCLE_MS = 2800;

const format = (n: number) => n.toLocaleString("en-US");

function Dots({ selected, wide }: { selected: number; wide?: boolean }) {
  return (
    <div className={wide ? "dots dots--wide" : "dots"} aria-hidden="true">
      {dotCauses.map((cause, i) => {
        const tail = cause === -1;
        const on = cause === selected;
        return (
          <div
            key={i}
            className="dot"
            style={{
              background: tail ? TAIL : palette[cause],
              opacity: tail ? 0.6 : on ? 1 : 0.22,
              transform: `scale(${on ? 1.15 : 1})`,
            }}
          />
        );
      })}
    </div>
  );
}

type Selection = { selected: number; pick: (i: number) => void };

function ProductQueue({ selected, pick }: Selection) {
  return (
    <div className="mock">
      <div className="mock__bar">
        <span className="mock__light" />
        <span className="mock__light" />
        <span className="mock__light" />
        <span className="mock__title">Root causes</span>
        <span className="mock__cycle">· October 2026 · 4,812,307 accounts tested</span>
        <span className="mock__rank">RANKED BY CONSUMER HARM</span>
      </div>
      <div className="mock__body">
        <div className="mock__side">
          <div className="mock__count">
            <span>ERRORS</span>
            <span>11,402</span>
          </div>
          <Dots selected={selected} />
          <div className="mock__caption">Each dot ≈ 80 errors. Grey = smaller issues, under review.</div>
        </div>
        <div className="mock__main">
          <div className="scroll-x">
            <div className="queue">
              <div className="queue__row queue__head">
                <span />
                <span>ROOT CAUSE</span>
                <span>SEVERITY</span>
                <span>FIRST SEEN</span>
                <span>OWNER</span>
                <span style={{ textAlign: "right" }}>ACCOUNTS</span>
              </div>
              {rootCauses.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  className="queue__row queue__item"
                  aria-pressed={i === selected}
                  onClick={() => pick(i)}
                >
                  <span className="queue__swatch" style={{ background: palette[i] }} />
                  <span className="queue__name">{c.name}</span>
                  <span className="queue__severity" style={{ color: severityColor[c.severity] }}>
                    {c.severity}
                  </span>
                  <span className="queue__date">{c.firstSeen}</span>
                  <span className="queue__owner">{c.owner}</span>
                  <span className="queue__accounts">{format(c.accounts)}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="hypothesis">
            <div>
              <div className="hypothesis__label">
                AI AGENT · LIKELY CAUSE · RC-{String(selected + 1).padStart(4, "0")}
              </div>
              {/* Every option shares one grid cell, so the page never shifts as the text changes. */}
              <div className="swap">
                {rootCauses.map((c, i) => (
                  <div key={c.name} className="swap__item hypothesis__text" data-active={i === selected}>
                    {c.hypothesis}
                  </div>
                ))}
              </div>
            </div>
            <div className="hypothesis__fix">
              <div className="hypothesis__fix-label">SUGGESTED FIX</div>
              <div className="swap swap--end">
                {rootCauses.map((c, i) => (
                  <div key={c.name} className="swap__item chip" data-active={i === selected}>
                    {c.fix}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsePanel({ selected, pick }: Selection) {
  return (
    <div className="collapse">
      <div>
        <div className="collapse__label">ALL ERRORS · OCTOBER 2026</div>
        <Dots selected={selected} wide />
      </div>
      <div className="collapse__list">
        <div className="collapse__label" style={{ marginBottom: 8 }}>
          ROOT CAUSES · RANKED BY CONSUMER HARM
        </div>
        {rootCauses.map((c, i) => (
          <button
            key={c.name}
            type="button"
            className="collapse__item"
            aria-pressed={i === selected}
            onClick={() => pick(i)}
          >
            <span className="queue__swatch" style={{ background: palette[i] }} />
            <span className="collapse__name">{c.name}</span>
            <span className="collapse__accounts">{format(c.accounts)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const [selected, setSelected] = useState(0);
  const [userPicked, setUserPicked] = useState(false);

  useEffect(() => {
    if (!config.autoCycle || userPicked) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setSelected((s) => (s + 1) % rootCauses.length), CYCLE_MS);
    return () => clearInterval(timer);
  }, [userPicked]);

  const pick = (i: number) => {
    setSelected(i);
    setUserPicked(true);
  };

  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <h1>
          <span>11,402</span> errors.
          <br />7 root causes.
        </h1>
        <p className="hero__sub">
          Parity checks every account you report to the credit bureaus and traces each error back to what caused it.
        </p>
        <div className="hero__cta">
          <a href="#audit" className="btn btn--primary">
            Start a historical audit
          </a>
          <a href="#how" className="btn btn--secondary">
            See how it works
          </a>
        </div>
        {config.heroVisual === "queue" ? (
          <ProductQueue selected={selected} pick={pick} />
        ) : (
          <CollapsePanel selected={selected} pick={pick} />
        )}
      </div>
    </section>
  );
}
