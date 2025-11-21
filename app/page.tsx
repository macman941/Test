const projectSummary = {
  name: "Riverbend Corridor Improvements",
  phase: "60% Design",
  manager: "Taylor Nguyen",
  targetAdDate: "February 12, 2026",
  nextMilestone: "Utility responses locked by January 5",
};

const utilityTeams = [
  {
    name: "City Water & Sewer",
    contact: "Morgan Lee",
    role: "Water/Wastewater",
    responseDue: "Dec 3",
    status: "Reviewing submittal",
    access: "Granted",
    pendingConflicts: 3,
  },
  {
    name: "Northern Gas",
    contact: "Jamie Patel",
    role: "Gas",
    responseDue: "Dec 12",
    status: "Awaiting markups",
    access: "Invited",
    pendingConflicts: 4,
  },
  {
    name: "BrightFiber",
    contact: "Lauren Brooks",
    role: "Fiber/Communications",
    responseDue: "Nov 29",
    status: "Approved with comments",
    access: "Granted",
    pendingConflicts: 1,
  },
  {
    name: "City Power",
    contact: "Emilio Torres",
    role: "Power",
    responseDue: "Dec 8",
    status: "Needs updated relocation plan",
    access: "Granted",
    pendingConflicts: 2,
  },
];

const conflictItems = [
  {
    id: "UC-012",
    location: "Sta. 14+50 to 16+00",
    description: "12\" gas main within proposed storm trunk alignment.",
    status: "Awaiting utility response",
    severity: "High",
    utility: "Northern Gas",
    due: "Dec 12",
    actions: ["Upload utility profile", "Confirm abandonment sequence"],
    owner: "Jamie Patel",
  },
  {
    id: "UC-018",
    location: "Sta. 03+10",
    description: "Fiber vault conflicts with new signal cabinet pad.",
    status: "Designer reviewing",
    severity: "Medium",
    utility: "BrightFiber",
    due: "Nov 29",
    actions: ["Provide temp bypass plan"],
    owner: "Lauren Brooks",
  },
  {
    id: "UC-021",
    location: "Sta. 22+75",
    description: "Sanitary service crossing at proposed box culvert wing wall.",
    status: "Revision required",
    severity: "High",
    utility: "City Water & Sewer",
    due: "Dec 3",
    actions: ["Approve relocation submittal", "Record clean-out offset"],
    owner: "Morgan Lee",
  },
  {
    id: "UC-027",
    location: "Sta. 28+00",
    description: "Overhead power conflicting with crane swing radius.",
    status: "In design response",
    severity: "Low",
    utility: "City Power",
    due: "Dec 8",
    actions: ["Add clearance note to plan", "Schedule field meet"],
    owner: "Emilio Torres",
  },
];

const workflowSteps = [
  {
    title: "Utility submittal",
    owner: "Utility company",
    detail: "Upload relocation drawings and schedule for review.",
    status: "2 pending",
    cta: "Request files",
  },
  {
    title: "Design review",
    owner: "Design team",
    detail: "Respond with comments and acceptable alignments.",
    status: "In progress",
    cta: "Open reviewer workspace",
  },
  {
    title: "Utility approval",
    owner: "Utility company",
    detail: "Sign off on conflict resolutions and mitigations.",
    status: "Awaiting signatures",
    cta: "Send approval packet",
  },
  {
    title: "Closeout & tracking",
    owner: "PM/Inspector",
    detail: "Lock responses, archive PDFs, and update conflict log.",
    status: "On schedule",
    cta: "Close resolved items",
  },
];

const recentActivity = [
  {
    actor: "Taylor Nguyen",
    role: "Project manager",
    time: "10:14 AM",
    summary: "Published 60% plans and requested responses from 4 utilities.",
  },
  {
    actor: "Morgan Lee (City Water)",
    role: "Utility reviewer",
    time: "9:20 AM",
    summary: "Flagged UC-021 as high priority and attached revised sewer profile.",
  },
  {
    actor: "Lauren Brooks (BrightFiber)",
    role: "Utility reviewer",
    time: "Yesterday",
    summary: "Approved UC-018 with temporary bypass staging, awaiting design note.",
  },
];

function chipClass(status: string) {
  if (status.toLowerCase().includes("await")) return "chip chip-warn";
  if (status.toLowerCase().includes("high")) return "chip chip-critical";
  if (status.toLowerCase().includes("approved")) return "chip chip-good";
  if (status.toLowerCase().includes("revision")) return "chip chip-critical";
  return "chip";
}

export default function HomePage() {
  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Design-phase conflict tracking</p>
          <h1>{projectSummary.name}</h1>
          <p className="lede">
            Assign utilities, gather comments, and route approvals so design stays ahead of field conflicts.
          </p>
          <div className="hero-actions">
            <button className="btn primary">Start utility workflow</button>
            <button className="btn ghost">Share read-only link</button>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-row">
            <span>Phase</span>
            <strong>{projectSummary.phase}</strong>
          </div>
          <div className="hero-row">
            <span>Design lead</span>
            <strong>{projectSummary.manager}</strong>
          </div>
          <div className="hero-row">
            <span>Target ad date</span>
            <strong>{projectSummary.targetAdDate}</strong>
          </div>
          <div className="hero-row">
            <span>Next milestone</span>
            <strong>{projectSummary.nextMilestone}</strong>
          </div>
        </div>
      </header>

      <section className="panels">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Project access</p>
              <h2>Assigned utility companies</h2>
            </div>
            <button className="btn">Invite utility</button>
          </div>
          <div className="utility-grid">
            {utilityTeams.map((team) => (
              <article key={team.name} className="utility-card">
                <div className="card-head">
                  <h3>{team.name}</h3>
                  <span className="chip">{team.access}</span>
                </div>
                <p className="muted">{team.role}</p>
                <div className="card-meta">
                  <div>
                    <span className="label">Primary contact</span>
                    <p>{team.contact}</p>
                  </div>
                  <div>
                    <span className="label">Response due</span>
                    <p>{team.responseDue}</p>
                  </div>
                </div>
                <div className="card-footer">
                  <span className={chipClass(team.status)}>{team.status}</span>
                  <span className="badge">{team.pendingConflicts} open conflicts</span>
                </div>
                <div className="actions">
                  <button className="link">Open workspace</button>
                  <button className="link">Send reminder</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Conflict review</p>
              <h2>Active conflict log</h2>
            </div>
            <button className="btn">Add conflict</button>
          </div>
          <div className="conflict-list">
            {conflictItems.map((conflict) => (
              <article key={conflict.id} className="conflict-row">
                <div className="conflict-id">
                  <p className="muted">{conflict.id}</p>
                  <p className="label">{conflict.location}</p>
                </div>
                <div className="conflict-body">
                  <p className="summary">{conflict.description}</p>
                  <div className="tags">
                    <span className={chipClass(conflict.status)}>{conflict.status}</span>
                    <span className="chip muted">{conflict.utility}</span>
                    <span className="chip muted">Due {conflict.due}</span>
                    <span className={`chip ${conflict.severity.toLowerCase()}-severity`}>
                      {conflict.severity} impact
                    </span>
                  </div>
                  <div className="actions">
                    {conflict.actions.map((action) => (
                      <button key={action} className="link">
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="conflict-owner">
                  <p className="label">Owner</p>
                  <p>{conflict.owner}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panels two-col">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Workflow</p>
              <h2>Submittal approvals</h2>
            </div>
            <button className="btn ghost">Configure steps</button>
          </div>
          <div className="workflow-grid">
            {workflowSteps.map((step) => (
              <article key={step.title} className="workflow-card">
                <div className="card-head">
                  <h3>{step.title}</h3>
                  <span className="chip muted">{step.owner}</span>
                </div>
                <p className="summary">{step.detail}</p>
                <div className="card-footer">
                  <span className="chip">{step.status}</span>
                  <button className="btn small">{step.cta}</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Engagement</p>
              <h2>Recent activity</h2>
            </div>
            <button className="btn ghost">Export log</button>
          </div>
          <div className="activity-list">
            {recentActivity.map((entry) => (
              <article key={entry.summary} className="activity-row">
                <div className="bullet" aria-hidden>
                  <span />
                </div>
                <div>
                  <div className="card-head">
                    <strong>{entry.actor}</strong>
                    <span className="chip muted">{entry.role}</span>
                    <span className="label">{entry.time}</span>
                  </div>
                  <p className="summary">{entry.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
