import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './notes.css'; // Using the same CSS file

// --- Add or update your syllabus links here ---
const mockSyllabusItems = [
  { id: 1, title: "AS & A Level Syllabus", url: "https://drive.google.com/file/d/14d_ksM1BgJ-H93wLesgkSU_Vazp5p9vg/view?usp=drive_link" },
  { id: 2, title: "IGCSE Syllabus", url: "https://drive.google.com/file/d/17Nd5ayc5-F1Tv3JD4Kd2CUm1jl8TjlQY/view?usp=drive_link" },
  { id: 3, title: "O Level Syllabus", url: "https://drive.google.com/file/d/1m5d8P2p8cwLO9zx4BWc4n6zJjP6zykqN/view?usp=drive_link" },
  { id: 4, title: "Pre u Syllabus", url: "https://drive.google.com/file/d/1Tc8Q3BSwp0JV-0xthUFg0Eoe-F8OKych/view?usp=drive_link" }
];

const SyllabusPage = () => {
  const [syllabusItems, setSyllabusItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setSyllabusItems(mockSyllabusItems);
      setLoading(false);
    }, 1000);
  }, []);

  // Improved regex for fileId extraction and debug log
  const getDriveFileId = (url) => {
    // Handles /file/d/FILE_ID/ and /file/d/FILE_ID and ignores extra params
    const match = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    return match ? match[1] : null;
  };

  const handleCardClick = (item) => {
    const fileId = getDriveFileId(item.url);
    console.log('Extracted fileId:', fileId, 'from url:', item.url); // Debug
    if (fileId) {
      navigate(`/resource/view/${fileId}?title=${encodeURIComponent(item.title)}`);
    } else {
      window.open(item.url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="notes-page">
        <div className="container-notes">
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading syllabus...</p>
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
            <h1>All Syllabus Guide</h1>
            <p>
              <strong>Access Complete Chemistry Syllabus Guides</strong><br/>
              Explore detailed and up-to-date Chemistry syllabus materials for every exam year. These guides outline all required topics, learning objectives, and assessment criteria to help you organize your studies effectively. Use the syllabus to track your progress, ensure full coverage of the curriculum, and focus your revision on essential concepts. Stay prepared and confident by following the official syllabus structure for Chemistry.
            </p>
          </div>
          <div className="hero-notes-image">
            <img 
              src="/img/sylla.png" 
              alt="Chemistry Syllabus Hero"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </section>
        <main>
          {syllabusItems.length === 0 && <div className="question">No syllabus available.</div>}
          {syllabusItems.map((item) => (
            <div
              key={item.id}
              className="ebook-item"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(item)}
            >
              <div style={{ flex: 1, fontWeight: 600 }}>{item.title}</div>
              <span style={{ marginLeft: 16, color: "#2563eb" }}>View</span>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default SyllabusPage;