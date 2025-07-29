"use client"

import { useState } from "react"
import { Trash2, Flower, Plus } from "lucide-react"
import "../styles/WelcomePage.css"



const WelcomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState({
    name: "Jonas Kahnwald",
    email: "xxxxx@xxxx.com",
  })

  const [notes, setNotes] = useState([
    { id: 1, title: "Note 1", content: "Meeting with design team to discuss new UI components" },
    { id: 2, title: "Note 2", content: "Brainstorming session for Q3 product features" },
  ])

  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [showForm, setShowForm] = useState(false)

  const handleCreateNote = () => {
    if (!newNote.title || !newNote.content) return

    const newNoteObj = {
      id: notes.length + 1,
      title: newNote.title,
      content: newNote.content,
    }

    setNotes([newNoteObj, ...notes])
    setNewNote({ title: "", content: "" })
    setShowForm(false)
  }

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  return (
    <div className="app-container">
      {/* Mobile Status Bar */}
      <div className="status-bar">
        <span>9:41</span>
        <div className="status-icons">
          <div className="signal-bars">
            <div className="bar active"></div>
            <div className="bar active"></div>
            <div className="bar active"></div>
            <div className="bar"></div>
          </div>
          <svg className="wifi-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <div className="battery"></div>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="header-left">
          <Flower className="logo-icon" />
          <h1 className="header-title">Dashboard</h1>
        </div>
        <button className="sign-out-btn">Sign Out</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-grid">
          {/* Left Column - Welcome & Create Note */}
          <div className="left-column">
            {/* Welcome Card */}
            <div className="welcome-card">
              <h2 className="welcome-title">Welcome, {user.name} !</h2>
              <p className="welcome-email">Email: {user.email}</p>
            </div>

            {/* Create Note Button */}
            <button onClick={() => setShowForm(true)} className="create-note-btn">
              <Plus className="create-icon" />
              <span>Create Note</span>
            </button>

            {/* Create Note Form */}
            {showForm && (
              <div className="note-form">
                <h3 className="form-title">New Note</h3>
                <div className="form-fields">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  />
                  <textarea
                    className="form-textarea"
                    placeholder="Write your note here..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  />
                  <div className="form-buttons">
                    <button onClick={handleCreateNote} className="save-btn">
                      Save Note
                    </button>
                    <button onClick={() => setShowForm(false)} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Notes */}
          <div className="right-column">
            <h3 className="notes-title">Notes</h3>

            {notes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="empty-text">No notes yet. Create your first note to get started</p>
              </div>
            ) : (
              <div className="notes-list">
                {notes.map((note) => (
                  <div key={note.id} className="note-item">
                    <div className="note-content">
                      <h4 className="note-title">{note.title}</h4>
                      <p className="note-description">{note.content}</p>
                    </div>
                    <button onClick={() => handleDeleteNote(note.id)} className="delete-btn">
                      <Trash2 className="delete-icon" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
