import React from 'react';
import './video.css';

const pastTutorials = [
  {
    title: 'Introduction to Organic Chemistry',
    description: 'Explore the fundamentals of organic chemistry, including basic concepts, nomenclature, and reaction mechanisms.',
    image: '/img/Organic Chemistry Introduction_.jpg',
    tag: { label: 'organic', color: 'blue' },
    meta: ['⭐ 4.5 (124 reviews)', '🕒 45 min', '👤 Beginner', '🏷️ Nomenclature, Alkanes'],
  },
  {
    title: 'Chemical Equilibrium and Kinetics',
    description: 'Learn how to solve complex equilibrium problems and understand reaction rates in detail.',
    image: '/img/Chemical Formula Photos - Download Free High-Quality Pictures _ Freepik.jpg',
    tag: { label: 'physical', color: 'purple' },
    meta: ['⭐ 4.4 (87 reviews)', '🕒 60 min', '👤 Intermediate', '🏷️ Equilibrium, Kinetics'],
  },
  {
    title: 'Advanced Analytical Techniques',
    description: 'Master advanced analytical chemistry techniques including spectroscopy and chromatography methods.',
    image: '/img/Science research concept featuring analysis, analyzing, and bio.jpg',
    tag: { label: 'analytical', color: 'orange' },
    meta: ['⭐ 4.7 (56 reviews)', '🕒 75 min', '👤 Advanced', '🏷️ Spectroscopy, Chromatography'],
  },
];

const topics = [
  {
    title: 'Organic Chemistry',
    image: '/img/Organic Chemistry IA.jpg',
    description: 'Comprehensive coverage of organic chemistry principles, from basic concepts to advanced synthesis.',
    details: ['📘 24 Lessons', '⏱ 16 hours total', '🔰 Beginner to Advanced'],
  },
  {
    title: 'Inorganic Chemistry',
    image: '/img/The philosophy of chemistry … and what it can tell us about life, the universe and everything.jpg',
    description: 'Explore the fascinating world of inorganic compounds, including coordination chemistry and catalysis.',
    details: ['📘 18 Lessons', '⏱ 12 hours total', '🔰 Intermediate'],
  },
  {
    title: 'Physical Chemistry',
    image: '/img/Top 10 resources for atomic structure.jpg',
    description: 'Master the mathematical principles behind chemical phenomena, including thermodynamics and quantum mechanics.',
    details: ['📘 20 Lessons', '⏱ 15 hours total', '🔰 Intermediate to Advanced'],
  },
  {
    title: 'Analytical Chemistry',
    image: '/img/trette.jpg',
    description: 'Learn modern analytical techniques used in research and industry for chemical analysis.',
    details: ['📘 16 Lessons', '⏱ 10 hours total', '🔰 All Levels'],
  },
  {
    title: 'Biochemistry',
    image: '/img/Premium Vector _ Genetic engineering.jpg',
    description: 'Understand the chemistry of biological systems, from proteins and enzymes to metabolism.',
    details: ['📘 22 Lessons', '⏱ 14 hours total', '🔰 Intermediate'],
  },
  {
    title: 'Exam Preparation',
    image: '/img/examhelp.jpg',
    description: 'Targeted tutorials for AP Chemistry, IB Chemistry, MCAT, and university exams.',
    details: ['📘 30 Lessons', '⏱ 20 hours total', '🔰 All Levels'],
  },
];

const VideoPage = () => (
  <div>
          <section className="hero-ebook">
      <div className="hero-video-content">
        <h1>Personalized Video lessons</h1>
        <p>Get expert guidance and became educated with our videos</p>
      </div>
    </section>

    <section className="past-tutorials">
      <h2>Past Tutorials</h2>
      <p>Browse our collection of previously recorded chemistry tutorials</p>
      <div className="filter-buttons">
        <button className="active">All</button>
        <button>Organic</button>
        <button>Inorganic</button>
        <button>Physical</button>
        <button>Analytical</button>
      </div>
      <div className="tutorial-cards">
        {pastTutorials.map((tutorial, idx) => (
          <div className="card-video" key={idx}>
            <div
              className="card-img"
              style={{ backgroundImage: `url('${tutorial.image}')` }}
            >
              <span className={`tag ${tutorial.tag.color}`}>{tutorial.tag.label}</span>
            </div>
            <div className="card-body">
              <h3>{tutorial.title}</h3>
              <p>{tutorial.description}</p>
              <div className="meta">
                {tutorial.meta.map((m, i) => <span key={i}>{m}</span>)}
              </div>
              <button className="watch-btn">Watch Tutorial</button>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="topical-tutorials">
      <h2>Topical Tutorials</h2>
      <p>Comprehensive lessons organized by subject matter</p>
      <div className="topics-grid">
        {topics.map((topic, idx) => (
          <div className="topic-card" key={idx}>
            <div
              className="topic-img"
              style={{ backgroundImage: `url('${topic.image}')` }}
            >
              <h3>{topic.title}</h3>
            </div>
            <div className="topic-body">
              <p>{topic.description}</p>
              <ul>
                {topic.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
              <button className="explore-btn">Explore Topic</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default VideoPage; 