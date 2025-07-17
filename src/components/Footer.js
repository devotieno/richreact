import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-container">
      <div className="footer-col brand">
        <div className="footer-logo-text">
          <i className="fas fa-vial"></i> <span className="brand-name">RICHMOND TUTORIAL HUB</span>
        </div>
        <div className="footer-logo-img">
          <img src="/img/logo.png" alt="Richmond Tutorials Logo" />
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://wa.me/254723884067" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
          <a href="mailto:anjiljoseph693@gmail.com"><i className="fas fa-envelope"></i></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      <div className="footer-col">
        <h5>Quick Links</h5>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/curri">Curricula</Link></li>
          <li><Link to="/tutorial">Tutor</Link></li>
          <li><Link to="/pdf">Resources</Link></li>
          <li><Link to="/faq">Community</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Resources</h5>
        <ul>
          <li><Link to="/ebook">Ebooks</Link></li>
          <li><Link to="/notes">Revision Notes</Link></li>
          <li><Link to="/papers">Past Papers</Link></li>
          <li><Link to="/video">Videos</Link></li>
        </ul>
      </div>
      <div className="footer-col">
        <h5>Contact Us</h5>
        <ul>
          <li>Phone: +254 723-884067</li>
          <li>Email: <a href="mailto:anjiljoseph693@gmail.com">anjiljoseph693@gmail.com</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; 2025 Richmond Tutorial. All rights reserved.
    </div>
  </footer>
);

export default Footer; 