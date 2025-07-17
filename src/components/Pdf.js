import React, { useState } from 'react';
import './Pdf.css';

const curricula = [
  { key: 'gcse', label: 'GCSE' },
  { key: 'igcse', label: 'IGCSE' },
  { key: 'as', label: 'AS' },
  { key: 'a', label: 'A Level' },
  { key: 'ib', label: 'IB' },
  { key: 'o', label: 'O Level' },
  { key: 'ap', label: 'AP' },
];

const Pdf = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      {/* Font Awesome stylesheet should be included in public/index.html, not here */}
      <div className="pdf-page-bg">
        <div className="hero-pdf">
          <div className="hero-text">
            <h1>All PDF Resources</h1>
            <strong>Master Chemistry with Precise tailored Pdf materials</strong>
            <p>Focus solely on what matters for your Chemistry exams and Cirriculum success.</p>
            <p>Our curated PDF materials are designed to help you excel in your Chemistry studies, providing you with the essential resources you need to succeed.</p>
          </div>
          <div className="hero-image">
            <img src="/img/pdf.png" alt="PDF resources cover for Chemistry" />
          </div>
        </div>
        <div className="pdf-card-list">
          {curricula.map((cur) => (
            <div
              className={`card-pdf${activeCard === cur.key ? ' active' : ''}`}
              key={cur.key}
              tabIndex={0}
              onClick={() => { setActiveCard(cur.key); openPopup(); }}
              onFocus={() => setActiveCard(cur.key)}
              onBlur={e => {
                // Only remove active if focus moves outside the card list
                if (!e.relatedTarget || !e.currentTarget.parentNode.contains(e.relatedTarget)) {
                  setActiveCard(null);
                }
              }}
            >
              <span className="card-pdf-label">{cur.label}</span>
              <i className="fas fa-arrow-right"></i>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div id="gcse-popup" className="popup-menu active">
          <button className="popup-close-btn" onClick={closePopup} aria-label="Close">
            <i className="fas fa-times"></i>
          </button>
          <a href="/ebook" className="popup-link-btn"><button>Ebooks</button></a>
          <a href="/notes" className="popup-link-btn"><button>Notes</button></a>
          <a href="/papers" className="popup-link-btn"><button>Past Papers</button></a>
        </div>
      )}
    </>
  );
};

export default Pdf; 