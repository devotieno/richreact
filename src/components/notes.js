import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './notes.css';

const mockNotes = [
  { id: 1, title: "Learners guide Cambridge International AS & A Level Chemistry", url: "https://drive.google.com/file/d/1hA2KBsdNwLyvfZWg1178YRxXqh6_l9CI/view?usp=drive_link" },
  { id: 2, title: "A level chemistry notes", url: "https://drive.google.com/file/d/1q0bEzGOcm_xZ9q1C9EUAWxrVJqU7aJlE/view?usp=drive_link" },
  { id: 3, title: "AS A level chemistry teacher's guide", url: "https://drive.google.com/file/d/17FnGf8rMe-GU2I7nVia1Gh4IkDuDi1aE/view?usp=drive_link" },
  { id: 4, title: "AS chemistry all in one revision topical notes", url: "https://drive.google.com/file/d/1yWV9xoij6QUL0i9sfcxHd5UuQGqzD18R/view?usp=drive_link" },
  { id: 5, title: "Calculations-for A level chemistry by E-N Ramsden", url: "https://drive.google.com/file/d/10B03axrD4sHCrChNfEYFQ0DjlRckSS9V/view?usp=drive_link" },
  { id: 6, title: "cambridge international as and a level chemistry revision guide", url: "https://drive.google.com/file/d/1ZFMIUKTh0PhLvzQ0CeJMbscKJd-Zk-AL/view?usp=drive_link" },
  { id: 7, title: "Cambridge learners guide to AS & A level chemistry", url: "https://drive.google.com/file/d/1hA2KBsdNwLyvfZWg1178YRxXqh6_l9CI/view?usp=drive_link" },
  { id: 8, title: "cie-A2-chemistry-9701-practical", url: "https://drive.google.com/file/d/1TXjhJ2hhH4eU21YIqncFa-x0yONZyEyz/view?usp=drive_link" },
  { id: 9, title: "cie-A2-chemistry-9701-theory", url: "https://drive.google.com/file/d/1BLJGnuO2CYru0RyX-l7myEvHS1LNl95B/view?usp=drive_link" },
  { id: 10, title: "cie-AS-chemistry-9701-practical", url: "https://drive.google.com/file/d/1ZfsU_gxlGKQe5yTA3LC12g0KIdGxBl2P/view?usp=drive_link" },
  { id: 11, title: "cie-AS-chemistry-9701-theory", url: "https://drive.google.com/file/d/1knErOOjLpZIwv8hBtqnCGHJaXEo4RA7R/view?usp=drive_link" },
  { id: 12, title: "Organic chemistry mechanisms of organic reactions", url: "https://drive.google.com/file/d/1fE3oLktWuC3a6T4obPuaRtKUSZXf-w1Z/view?usp=drive_link" },
  { id: 13, title: "learner-guide for cambridge igcse chemistry 0971", url: "https://drive.google.com/file/d/1O0jActvNePsTEVpL-w5oweq9YiDyI19y/view?usp=drive_link" },
  { id: 14, title: "Learner's guide to Cambridge IGCSE Chemistry 0620", url: "https://drive.google.com/file/d/1DERE2JStJPuKaCIqiztfoRZYyIDNY9BW/view?usp=drive_link" },
  { id: 15, title: "cambridge IGCSE chemistry revision guide", url: "https://drive.google.com/file/d/1NcZCHQvqYrC-i9KbfT_8vfJhvyLDEi5B/view?usp=drive_link" },
  { id: 16, title: "cie-IGCSE-chemistry-0620 practical", url: "https://drive.google.com/file/d/1mdYNou8z9VmaMhNpWdsqEHv8zdxVdgr-/view?usp=drive_link" },
  { id: 17, title: "cie-IGCSE-chemistry-0620 theory", url: "https://drive.google.com/file/d/171vRibR1A1OhWdw_BQYMRjzGpZdVPjmz/view?usp=drive_link" },
  { id: 18, title: "IGCSE chemistry study guide", url: "https://drive.google.com/file/d/1pN8E_Q4g_3DIV5DUnMtwSJt6SufJNssP/view?usp=drive_link" },
  { id: 19, title: "IGCSE notes by abdulla", url: "https://drive.google.com/file/d/1oaQsMupaL4oC-7l3755LQ41QZp5lZwOu/view?usp=drive_link" }
];

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setNotes(mockNotes);
      setLoading(false);
    }, 1000);
  }, []);

  // Helper to extract fileId from Google Drive file URL
  const getDriveFileId = (url) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    return match ? match[1] : null;
  };

  const handleCardClick = (note) => {
    const fileId = getDriveFileId(note.url);
    if (fileId) {
      navigate(`/resource/view/${fileId}?title=${encodeURIComponent(note.title)}`);
    } else {
      window.open(note.url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="notes-page">
        <div className="container-notes">
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading notes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-page">
      <div className="container-notes">
        <section className="hero-notes">
          <div className="hero-notes-text">
            <h1>All Notes Resources</h1>
            <p>
              <strong>Master Chemistry with Our Expert Notes</strong><br/>
              Focus on what truly matters for your Chemistry success.<br/><br/>
              Our notes are meticulously crafted to align with your syllabus, breaking down complex concepts into clear, easy-to-understand explanations.<br/><br/>
              Created by experienced teachers and tutors, these notes are regularly updated to reflect the latest curriculum changes.<br/><br/>
              Make your revision more effective with concise summaries, diagrams, and key points that help you grasp topics faster.<br/><br/>
              Start using our Chemistry notes today to strengthen your understanding and boost your exam performance.
            </p>
          </div>
          <div className="hero-notes-image">
            <img 
              src="/img/notes.png" 
              alt="Chemistry Notes Hero"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </section>
        <main>
          {notes.length === 0 && <div className="question">No notes available.</div>}
          {notes.map((note) => (
            <div
              key={note.id}
              className="ebook-item"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(note)}
            >
              <div style={{ flex: 1, fontWeight: 600 }}>{note.title}</div>
              <span style={{ marginLeft: 16, color: "#2563eb" }}>View</span>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default NotesPage;