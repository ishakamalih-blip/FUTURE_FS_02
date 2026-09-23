import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/leads";

const emptyForm = {
  name: "",
  email: "",
  source: "Website",
  status: "New",
  notes: "",
  followUpDate: "",
};

function App() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState(emptyForm);

  // Load leads from MongoDB
  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
      setError("Backend connection failed. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const name = lead.name?.toLowerCase() || "";
      const email = lead.email?.toLowerCase() || "";
      const searchText = search.toLowerCase();

      const matchesSearch =
        name.includes(searchText) || email.includes(searchText);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const openAddModal = () => {
    setEditingLead(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);

    setForm({
      name: lead.name || "",
      email: lead.email || "",
      source: lead.source || "Website",
      status: lead.status || "New",
      notes: lead.notes || "",
      followUpDate: lead.followUpDate
        ? lead.followUpDate.substring(0, 10)
        : "",
    });

    setShowModal(true);
  };

  // Add / Edit Lead
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Please enter name and email.");
      return;
    }

    try {
      const url = editingLead
        ? `${API_URL}/${editingLead._id}`
        : API_URL;

      const method = editingLead ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          followUpDate: form.followUpDate || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save lead");
      }

      setShowModal(false);
      setEditingLead(null);
      setForm(emptyForm);

      await fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Unable to save lead. Check your backend server.");
    }
  };

  // Delete Lead
  const deleteLead = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }

      await fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Unable to delete lead.");
    }
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      await fetchLeads();
    } catch (err) {
      console.error(err);
      alert("Unable to update status.");
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">F</div>

          <div>
            <h2>Future CRM</h2>
            <span>Lead Management</span>
          </div>
        </div>

        <nav className="navigation">
          <a className="nav-item active" href="#dashboard">
            <span>▦</span>
            Dashboard
          </a>

          <a className="nav-item" href="#leads">
            <span>♙</span>
            Leads
          </a>

          <a className="nav-item" href="#followups">
            <span>◷</span>
            Follow-ups
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-card">
            <div className="avatar">IK</div>

            <div>
              <strong>Isha Kamalia</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">CLIENT RELATIONSHIP MANAGEMENT</p>

            <h1>Lead Dashboard</h1>

            <p className="subtitle">
              Manage your leads, follow-ups and client relationships.
            </p>
          </div>

          <button className="primary-btn" onClick={openAddModal}>
            <span>+</span>
            Add Lead
          </button>
        </header>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "20px",
              borderRadius: "8px",
              background: "rgba(220, 70, 80, 0.12)",
              border: "1px solid rgba(220, 70, 80, 0.3)",
              color: "#ff9da5",
              fontSize: "12px",
            }}
          >
            {error}
          </div>
        )}

        {/* Statistics */}
        <section className="stats-grid" id="dashboard">
          <div className="stat-card">
            <div className="stat-top">
              <span>Total Leads</span>
              <div className="stat-icon blue">◎</div>
            </div>

            <strong>{totalLeads}</strong>
            <small>All registered leads</small>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>New Leads</span>
              <div className="stat-icon purple">✦</div>
            </div>

            <strong>{newLeads}</strong>
            <small>Waiting for contact</small>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Contacted</span>
              <div className="stat-icon orange">↗</div>
            </div>

            <strong>{contactedLeads}</strong>
            <small>Currently in progress</small>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Converted</span>
              <div className="stat-icon green">✓</div>
            </div>

            <strong>{convertedLeads}</strong>
            <small>Successful conversions</small>
          </div>
        </section>

        {/* Leads */}
        <section className="leads-section" id="leads">
          <div className="section-header">
            <div>
              <h2>All Leads</h2>
              <p>View and manage your client leads.</p>
            </div>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>LEAD</th>
                  <th>SOURCE</th>
                  <th>STATUS</th>
                  <th>FOLLOW-UP</th>
                  <th>NOTES</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        <div>⟳</div>
                        <h3>Loading leads...</h3>
                        <p>Fetching data from MongoDB.</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id}>
                      <td>
                        <div className="lead-person">
                          <div className="lead-avatar">
                            {lead.name?.charAt(0)?.toUpperCase()}
                          </div>

                          <div>
                            <strong>{lead.name}</strong>
                            <span>{lead.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="source">
                          {lead.source || "Website"}
                        </span>
                      </td>

                      <td>
                        <select
                          className={`status-select ${lead.status
                            ?.toLowerCase()
                            .replace(" ", "-")}`}
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(
                              lead._id,
                              e.target.value
                            )
                          }
                        >
                          <option value="New">New</option>
                          <option value="Contacted">
                            Contacted
                          </option>
                          <option value="Converted">
                            Converted
                          </option>
                        </select>
                      </td>

                      <td>
                        <span className="follow-up">
                          {lead.followUpDate
                            ? new Date(
                                lead.followUpDate
                              ).toLocaleDateString()
                            : "Not scheduled"}
                        </span>
                      </td>

                      <td>
                        <span className="notes" title={lead.notes}>
                          {lead.notes || "No notes"}
                        </span>
                      </td>

                      <td>
                        <div className="actions">
                          <button
                            className="icon-btn edit"
                            title="Edit"
                            onClick={() =>
                              openEditModal(lead)
                            }
                          >
                            ✎
                          </button>

                          <button
                            className="icon-btn delete"
                            title="Delete"
                            onClick={() =>
                              deleteLead(lead._id)
                            }
                          >
                            ×
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        <div>⌕</div>
                        <h3>No leads found</h3>
                        <p>
                          Add your first client lead using the
                          Add Lead button.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Showing <strong>{filteredLeads.length}</strong> of{" "}
            <strong>{leads.length}</strong> leads
          </div>
        </section>

        {/* Follow-up */}
        <section className="follow-section" id="followups">
          <div>
            <p className="eyebrow">STAY ORGANIZED</p>

            <h2>Never miss a follow-up.</h2>

            <p>
              Keep track of client conversations and follow-up
              dates from one centralized dashboard.
            </p>
          </div>

          <button className="secondary-btn" onClick={openAddModal}>
            Schedule Follow-up
          </button>
        </section>
      </main>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <p className="eyebrow">LEAD MANAGEMENT</p>

                <h2>
                  {editingLead
                    ? "Edit Lead"
                    : "Add New Lead"}
                </h2>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>

                  <input
                    type="text"
                    placeholder="Enter lead name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Lead Source</label>

                  <select
                    value={form.source}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        source: e.target.value,
                      })
                    }
                  >
                    <option>Website</option>
                    <option>LinkedIn</option>
                    <option>Referral</option>
                    <option>Instagram</option>
                    <option>Google</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Converted</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Follow-up Date</label>

                  <input
                    type="date"
                    value={form.followUpDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        followUpDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group full">
                  <label>Notes</label>

                  <textarea
                    rows="4"
                    placeholder="Add notes about this lead..."
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingLead
                    ? "Save Changes"
                    : "Add Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;