"use client";

import { useState } from "react";
import { roles } from "@/lib/content";

export function Roles() {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Who uses Parity">
        {roles.map((r, i) => (
          <button
            key={r.role}
            type="button"
            role="tab"
            id={`role-tab-${i}`}
            aria-selected={i === active}
            aria-controls="role-panel"
            className="tab"
            onClick={() => setActive(i)}
          >
            {r.role}
          </button>
        ))}
      </div>
      <div className="role" role="tabpanel" id="role-panel" aria-labelledby={`role-tab-${active}`}>
        <h2 className="role__need">“{role.need}”</h2>
        <ul className="role__gets">
          {role.gets.map((item) => (
            <li key={item} className="role__get">
              <span aria-hidden="true">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
