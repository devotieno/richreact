import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ebook.css';

// Replace these with your actual Google Drive file IDs and download links
const ebookData = {
  "AS & A Level": [
    {
      title: "AS A level chemistry practical workbook",
      fileId: "1r3wzAH7gPt-_UfrRieXjpebL04gBsNUZ"
    },
    {
      title: "Asal chemistry cb executive preview digital",
      fileId: "1n6TsK93y8rMJkxirhQkuDmQEqzgHoZeV"
    },
    {
      title: "Cambridge international AS & A level chemistry course book",
      fileId: "1e9Q59QRUe_rLEyfP384FOEEWVjBfHs2Z"
    },
    {
      title: "Cambridge international AS & A level chemistry workbook",
      fileId: "1iv_ER-AcoPaWe6GFLIPyilRafHAV79Ip"
    },
    {
      title: "Cambridge international AS & A level chemistry ",
      fileId: "1CchiL-S45qCT5I9SgjPnQYGuc0yR-qOP"
    }
  ],
  "IGCSE": [
    {
      title: "Cambridge IGCSE chemistry by Brian Earl & Doug Wilford",
      fileId: "1gjkNGq91AHjs39CcjuJVYr66U8UXfyDo"
    },
    {
      title: "Cambridge IGCSE chemistry practical workbook",
      fileId: "1j8L1W_FvQXiFz2Uh20v445IJlXL9Mj1H"
    },
    {
      title: "Cambridge IGCSE chemistry workbook",
      fileId: "1gX8DgPXegkdNHC4USLw-tkDyZUyM9ZR2"
    },
    {
      title: "IGCSE chemistry maths skills workbook ",
      fileId: "1DlvBx_Iz3pkG6Ztfl5TELhwzVDpUG8L8"
    },
    {
      title: "Cambridge IGCSE chemistry workbook by Richard Hardwood",
      fileId: "1ms8iVfFgGd_MaPPZDnSimDygH8bzX3Oj"
    }
  ],
  "O Level": [
    // Add O Level ebooks here
  ],
  "Pre U": [
    // Add Pre U ebooks here
  ]
};

const categories = Object.keys(ebookData);

const Ebooks = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const navigate = useNavigate();

  const filterCategory = (category) => {
    setActiveCategory(category);
  };

  const handleEbookClick = (fileId, title) => {
    navigate(`/resource/view/${fileId}?title=${encodeURIComponent(title)}`);
  };

  const renderEbooks = () => {
    return categories.map(cat => {
      if (activeCategory && cat !== activeCategory) return null;
      return (
        <div key={cat} className="faq-section">
          <div className="section-title">{cat}</div>
          {ebookData[cat].length === 0 && <div className="question">No eBooks available.</div>}
          {ebookData[cat].map(({ title, fileId }, index) => (
            <div
              key={index}
              className="ebook-item"
              style={{ cursor: "pointer" }}
              onClick={() => handleEbookClick(fileId, title)}
            >
              <div style={{ flex: 1, fontWeight: 600 }}>{title}</div>
              <span style={{ marginLeft: 16, color: "#2563eb" }}>View</span>
            </div>
          ))}
        </div>
      );
    });
  };

  return (
    <div className="container-ebook ebook-page">
      <section className="hero-ebook">
        <div className="hero-ebook-text">
          <h1>Great Material</h1>
          <p>
            <strong>Access Complete Chemistry Ebooks</strong><br />
            Explore detailed and up-to-date Chemistry ebooks for every curriculum. These ebooks cover all required topics, learning objectives, and assessment criteria to help you organize your studies effectively. Use them to track your progress, ensure full coverage of the curriculum, and focus your revision on essential concepts. Stay prepared and confident by following the official syllabus structure with these comprehensive Chemistry ebooks.
          </p>
        </div>
        <div className="hero-ebook-image">
          <img src="img/ebook.png" alt="Chemistry Notes Hero" />
        </div>
      </section>
      <main>
        <div className="tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => filterCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div id="faqContainer" className="shadow-dark">
          {renderEbooks()}
        </div>
      </main>
    </div>
  );
};

export default Ebooks; 