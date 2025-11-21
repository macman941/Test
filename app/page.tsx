"use client";

import { useMemo, useState } from "react";

type TicketStatus = "Open" | "In Review" | "Field Check" | "Resolved";
type TicketPriority = "Low" | "Standard" | "Urgent";

type Ticket = {
  id: string;
  location: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  owner: string;
  requestedBy: string;
  due: string;
  type: string;
  notes?: string;
};

const initialTickets: Ticket[] = [
  {
    id: "FM-2317",
    location: "First St & Fowler St",
    description: "Locate storm trunk to support canal bypass tie-in.",
    status: "Open",
    priority: "Urgent",
    owner: "K. Ramirez",
    requestedBy: "City PM",
    due: "Today",
    type: "Stormwater",
    notes: "Need depth at existing concrete collar and invert at upstream MH.",
  },
  {
    id: "FM-2318",
    location: "Marion St between Hendry & Jackson",
    description: "Verify fiber bundle clearance near new signal cabinet pad.",
    status: "In Review",
    priority: "Standard",
    owner: "J. Patel",
    requestedBy: "Design Team",
    due: "Tomorrow",
    type: "Communications",
    notes: "Ticket shared with BrightFiber; need splice diagram upload.",
  },
  {
    id: "FM-2320",
    location: "Cleveland Ave at Winkler Ave",
    description: "Confirm water service at proposed median opening.",
    status: "Field Check",
    priority: "Standard",
    owner: "L. Howard",
    requestedBy: "City Inspector",
    due: "Nov 18",
    type: "Water",
    notes: "Coordinate night work window; FDOT lane closure plan pending.",
  },
  {
    id: "FM-2324",
    location: "Ortiz Ave north of Ballard Rd",
    description: "Locate overhead power for crane swing clearance study.",
    status: "Resolved",
    priority: "Low",
    owner: "M. Lee",
    requestedBy: "Contractor",
    due: "Closed",
    type: "Power",
    notes: "Photos uploaded; clearance note added to MOT sheet.",
  },
];

const badgeTone: Record<TicketStatus, string> = {
  Open: "tone-amber",
  "In Review": "tone-blue",
  "Field Check": "tone-cyan",
  Resolved: "tone-green",
};

const priorityTone: Record<TicketPriority, string> = {
  Low: "tone-gray",
  Standard: "tone-indigo",
  Urgent: "tone-red",
};

export default function HomePage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [search, setSearch] = useState("");
  const [formState, setFormState] = useState<Ticket>({
    id: "FM-23XX",
    location: "",
    description: "",
    status: "Open",
    priority: "Standard",
    owner: "",
    requestedBy: "",
    due: "",
    type: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return tickets;
    return tickets.filter(
      (ticket) =>
        ticket.id.toLowerCase().includes(query) ||
        ticket.location.toLowerCase().includes(query) ||
        ticket.description.toLowerCase().includes(query) ||
        ticket.type.toLowerCase().includes(query),
    );
  }, [tickets, search]);

  const stats = useMemo(() => {
    const open = tickets.filter((t) => t.status !== "Resolved").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;
    const urgent = tickets.filter((t) => t.priority === "Urgent").length;
    return { open, resolved, urgent };
  }, [tickets]);

  const clearForm = () => {
    setFormState({
      id: "FM-23XX",
      location: "",
      description: "",
      status: "Open",
      priority: "Standard",
      owner: "",
      requestedBy: "",
      due: "",
      type: "",
      notes: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = {
      ...formState,
      id: formState.id.trim(),
      location: formState.location.trim(),
      description: formState.description.trim(),
      owner: formState.owner.trim(),
      requestedBy: formState.requestedBy.trim(),
      type: formState.type.trim(),
      notes: formState.notes?.trim() ?? "",
      due: formState.due.trim() || "TBD",
    };

    if (!trimmed.id || !trimmed.location || !trimmed.description) return;

    setTickets((current) => {
      if (editingId) {
        return current.map((ticket) => (ticket.id === editingId ? trimmed : ticket));
      }
      return [trimmed, ...current];
    });

    clearForm();
  };

  const startEdit = (ticket: Ticket) => {
    setFormState(ticket);
    setEditingId(ticket.id);
  };

  const handleDelete = (id: string) => {
    setTickets((current) => current.filter((ticket) => ticket.id !== id));
    if (editingId === id) {
      clearForm();
    }
  };

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">City of Fort Myers</p>
          <h1>Underground utility locate tracker</h1>
          <p className="lede">
            Track locate tickets, coordinate responses, and keep contractors aligned with field-ready
            information for downtown Fort Myers projects.
          </p>
          <div className="hero-actions">
            <button className="btn primary">Create locate packet</button>
            <button className="btn ghost">Share public view</button>
          </div>
          <div className="pill-row">
            <span className="chip muted">Mirrors: Lee County 811 feed</span>
            <span className="chip muted">Updated live every 15 minutes</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-stat">
            <p className="label">Active tickets</p>
            <strong>{stats.open}</strong>
            <span className="pill">{stats.urgent} urgent</span>
          </div>
          <div className="hero-stat">
            <p className="label">Resolved this week</p>
            <strong>{stats.resolved}</strong>
            <span className="pill">Field crews notified</span>
          </div>
          <div className="divider" />
          <div className="stack">
            <div className="stack-row">
              <span className="dot dot-blue" />
              <p className="label">Designer requests</p>
              <strong>8</strong>
            </div>
            <div className="stack-row">
              <span className="dot dot-green" />
              <p className="label">Contractor requests</p>
              <strong>5</strong>
            </div>
            <div className="stack-row">
              <span className="dot dot-amber" />
              <p className="label">Public safety flags</p>
              <strong>2</strong>
            </div>
          </div>
        </div>
      </header>

      <section className="panels">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Tickets</p>
              <h2>Locate log</h2>
            </div>
            <div className="panel-actions">
              <input
                className="input"
                placeholder="Search by ID, location, or utility"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <button className="btn">Export CSV</button>
            </div>
          </div>

          <div className="ticket-grid">
            {filteredTickets.map((ticket) => (
              <article key={ticket.id} className="ticket-card">
                <div className="card-head">
                  <div>
                    <p className="label">{ticket.id}</p>
                    <h3>{ticket.location}</h3>
                  </div>
                  <div className="tag-stack">
                    <span className={`chip ${badgeTone[ticket.status]}`}>{ticket.status}</span>
                    <span className={`chip ${priorityTone[ticket.priority]}`}>
                      {ticket.priority} priority
                    </span>
                  </div>
                </div>
                <p className="summary">{ticket.description}</p>
                <div className="ticket-meta">
                  <div>
                    <p className="label">Requested by</p>
                    <p>{ticket.requestedBy}</p>
                  </div>
                  <div>
                    <p className="label">Assigned to</p>
                    <p>{ticket.owner}</p>
                  </div>
                  <div>
                    <p className="label">Due</p>
                    <p>{ticket.due}</p>
                  </div>
                  <div>
                    <p className="label">Utility type</p>
                    <p>{ticket.type}</p>
                  </div>
                </div>
                {ticket.notes ? <p className="muted">{ticket.notes}</p> : null}
                <div className="actions">
                  <button className="link" onClick={() => startEdit(ticket)}>
                    Edit ticket
                  </button>
                  <button className="link danger" onClick={() => handleDelete(ticket.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
            {filteredTickets.length === 0 && (
              <div className="empty">
                <p className="summary">No tickets match that search.</p>
                <p className="muted">Try another ID, location, or utility type.</p>
              </div>
            )}
          </div>
        </div>

        <div className="panel form-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Forms</p>
              <h2>{editingId ? "Edit ticket" : "Add a locate ticket"}</h2>
            </div>
            {editingId ? (
              <button className="btn ghost" onClick={clearForm}>
                Cancel edit
              </button>
            ) : null}
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Ticket ID
                <input
                  className="input"
                  value={formState.id}
                  onChange={(event) => setFormState({ ...formState, id: event.target.value })}
                  required
                />
              </label>
              <label>
                Location
                <input
                  className="input"
                  value={formState.location}
                  onChange={(event) => setFormState({ ...formState, location: event.target.value })}
                  required
                />
              </label>
              <label>
                Requested by
                <input
                  className="input"
                  value={formState.requestedBy}
                  onChange={(event) => setFormState({ ...formState, requestedBy: event.target.value })}
                  required
                />
              </label>
              <label>
                Assigned to
                <input
                  className="input"
                  value={formState.owner}
                  onChange={(event) => setFormState({ ...formState, owner: event.target.value })}
                  required
                />
              </label>
              <label>
                Due date
                <input
                  className="input"
                  value={formState.due}
                  onChange={(event) => setFormState({ ...formState, due: event.target.value })}
                  placeholder="e.g., Nov 22"
                />
              </label>
              <label>
                Utility type
                <input
                  className="input"
                  value={formState.type}
                  onChange={(event) => setFormState({ ...formState, type: event.target.value })}
                  required
                />
              </label>
              <label>
                Status
                <select
                  className="input"
                  value={formState.status}
                  onChange={(event) =>
                    setFormState({ ...formState, status: event.target.value as TicketStatus })
                  }
                >
                  <option value="Open">Open</option>
                  <option value="In Review">In Review</option>
                  <option value="Field Check">Field Check</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </label>
              <label>
                Priority
                <select
                  className="input"
                  value={formState.priority}
                  onChange={(event) =>
                    setFormState({ ...formState, priority: event.target.value as TicketPriority })
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Standard">Standard</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </label>
            </div>
            <label>
              Description
              <textarea
                className="input"
                rows={3}
                value={formState.description}
                onChange={(event) => setFormState({ ...formState, description: event.target.value })}
                required
              />
            </label>
            <label>
              Notes
              <textarea
                className="input"
                rows={2}
                value={formState.notes}
                onChange={(event) => setFormState({ ...formState, notes: event.target.value })}
                placeholder="Site access, attachments, or contact details"
              />
            </label>
            <div className="actions">
              <button type="submit" className="btn primary">
                {editingId ? "Save changes" : "Add ticket"}
              </button>
              <button type="button" className="btn ghost" onClick={clearForm}>
                Reset form
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="panels two-col">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Timeline</p>
              <h2>Live coordination</h2>
            </div>
            <button className="btn ghost">Notify crews</button>
          </div>
          <div className="activity-list">
            {[
              "60% plans released for River District detour",
              "OPS center confirmed night-work window for Cleveland Ave",
              "BrightFiber uploaded splice diagram for FM-2318",
              "Contractor requested flagger support for First St work",
              "Water division closed FM-2324 and posted photos",
            ].map((item) => (
              <article key={item} className="activity-row">
                <div className="bullet" aria-hidden>
                  <span />
                </div>
                <div>
                  <p className="summary">{item}</p>
                  <p className="label">Updated just now</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Readiness</p>
              <h2>Inspection prep</h2>
            </div>
            <button className="btn ghost">Download packet</button>
          </div>
          <div className="readiness-grid">
            <div className="readiness-card">
              <div className="card-head">
                <p className="label">Overdue response</p>
                <span className="chip tone-amber">2</span>
              </div>
              <p className="summary">Follow up on FM-2317 field sketches.</p>
            </div>
            <div className="readiness-card">
              <div className="card-head">
                <p className="label">Tickets ready to close</p>
                <span className="chip tone-green">3</span>
              </div>
              <p className="summary">Update GIS layers and archive PDFs.</p>
            </div>
            <div className="readiness-card">
              <div className="card-head">
                <p className="label">Crew packets</p>
                <span className="chip tone-blue">5</span>
              </div>
              <p className="summary">Include traffic shifts and safety notes.</p>
            </div>
            <div className="readiness-card">
              <div className="card-head">
                <p className="label">Stakeholder calls</p>
                <span className="chip tone-indigo">Today</span>
              </div>
              <p className="summary">Coordinate with FMPD and downtown merchants.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
