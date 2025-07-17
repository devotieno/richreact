import React, { useState } from 'react';
import './ebook.css';

const faqData = {
  'General Chemistry': [
    'What is the difference between an atom and a molecule?',
    'What is the difference between ionic and covalent bonds?',
    'How do you balance chemical equations?',
    'What is the pH scale and what does it measure?'
  ],
  'Organic Chemistry': [
    'What is an alkane, alkene, and alkyne?',
    'How do you name organic compounds?',
    'What are functional groups in organic chemistry?',
    'What is isomerism in organic chemistry?'
  ],
  'Physical Chemistry': [
    'What is the ideal gas law?',
    'How is enthalpy different from entropy?',
    'What is a redox reaction?',
    'How do catalysts affect chemical reactions?'
  ],
  'Analytical Chemistry': [
    'What is chromatography?',
    'How does spectroscopy work?',
    'What is a titration?',
    'What is the purpose of a standard solution?'
  ]
};

const categories = Object.keys(faqData);

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState('');

  const filteredQuestions = faqData[activeCategory].filter(q =>
    q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <section className="hero-ebook">
        <div className="container-ebook">
          <h1>Chemistry FAQs</h1>
          <p>Find answers to common chemistry questions. Browse by category or search for specific topics.</p>
          <input
            type="text"
            placeholder="🔍 Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginTop: '1rem' }}
          />
        </div>
      </section>
      <div className="tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <main id="faqContainer" className="shadow-dark">
        <div className="faq-section">
          <div className="section-title">{activeCategory}</div>
          {filteredQuestions.map((q, idx) => (
            <div className="question" key={idx}>{q}</div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FaqPage; 