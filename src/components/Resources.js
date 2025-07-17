import React from "react";
import { Link } from "react-router-dom";
import './Resources.css';

const Resources = () => {
  // Resource categories with their details
  const resourceCategories = [
    {
      id: 'pdf',
      title: 'PDF Resources',
      description: 'Comprehensive PDF materials including textbooks, guides, and reference materials',
      icon: '📄',
      color: '#2563eb',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      items: [
        { name: 'E-Books', path: '/ebook', description: 'Digital textbooks and comprehensive guides' },
        { name: 'Revision Notes', path: '/notes', description: 'Condensed study materials for quick revision' }
      ]
    },
    {
      id: 'curriculum',
      title: 'Curriculum & Syllabus',
      description: 'Official curriculum guides and syllabus documents for all chemistry levels',
      icon: '📚',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      items: [
        { name: 'Syllabus', path: '/syllabus', description: 'Official curriculum documents and course outlines' }
      ]
    },
    {
      id: 'exams',
      title: 'Exam Preparation',
      description: 'Practice materials and past papers for comprehensive exam preparation',
      icon: '📝',
      color: '#dc2626',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
      items: [
        { name: 'Exam Questions', path: '/exam', description: 'Practice questions and exam-style problems' },
        { name: 'Past Papers', path: '/papers', description: 'Past examination papers for practice' },
        { name: 'Examiner Reports', path: '/examiner', description: 'Detailed examiner feedback and analysis' }
      ]
    },
    {
      id: 'multimedia',
      title: 'Multimedia Resources',
      description: 'Video tutorials and interactive learning materials',
      icon: '🎥',
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
      items: [
        { name: 'Video Tutorials', path: '/video', description: 'Comprehensive video lessons and tutorials' }
      ]
    },
    {
      id: 'community',
      title: 'Community & Support',
      description: 'Interactive features for student engagement and support',
      icon: '👥',
      color: '#ea580c',
      gradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
      items: [
        { name: 'Questions Post', path: '/question', description: 'Ask questions and get expert answers' },
        { name: 'FAQ', path: '/faq', description: 'Frequently asked questions and answers' }
      ]
    },
    {
      id: 'services',
      title: 'Tutoring Services',
      description: 'Professional tutoring and learning support services',
      icon: '🎓',
      color: '#0891b2',
      gradient: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
      items: [
        { name: 'Tutor Profile', path: '/tutorial', description: 'Meet your chemistry tutor and view credentials' },
        { name: 'Pricing & Booking', path: '/pricing', description: 'Tutoring packages and session booking' }
      ]
    }
  ];

  return (
    <div className="resources-page">
      {/* Hero Section */}
      <section className="hero-resources">
        <div className="hero-content">
          <h1>Chemistry Learning Resources</h1>
          <p>
            Access our comprehensive collection of chemistry resources designed to support your learning journey. 
            From revision notes to video tutorials, past papers to interactive Q&A, everything you need to excel 
            in chemistry is right here.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Resources</span>
            </div>
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Access</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="/img/logo.png" 
            alt="Richmond Tutorials Resources"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* Resources Grid */}
      <section className="resource-grid">
        <div className="container-resources">
          <h2>Explore Our Resources</h2>
          <p className="section-description">
            Click on any resource category to access comprehensive materials and tools
          </p>
          
          <div className="categories-grid">
            {resourceCategories.map((category) => (
              <div key={category.id} className="category-card">
                <div 
                  className="category-header"
                  style={{ background: category.gradient }}
                >
                  <span className="category-icon">{category.icon}</span>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
                
                <div className="category-items">
                  {category.items.map((item, index) => (
                    <Link 
                      key={index} 
                      to={item.path} 
                      className="resource-item"
                    >
                      <div className="item-content">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                      </div>
                      <div className="item-arrow">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="quick-access">
        <div className="container">
          <h2>Quick Access</h2>
          <p>Most popular resources for immediate access</p>
          
          <div className="quick-grid">
            <Link to="/notes" className="quick-card">
              <div className="quick-icon">📝</div>
              <h3>Revision Notes</h3>
              <p>Essential study materials for quick revision</p>
            </Link>
            
            <Link to="/exam" className="quick-card">
              <div className="quick-icon">📊</div>
              <h3>Practice Questions</h3>
              <p>Test your knowledge with exam-style questions</p>
            </Link>
            
            <Link to="/video" className="quick-card">
              <div className="quick-icon">🎬</div>
              <h3>Video Tutorials</h3>
              <p>Learn through comprehensive video lessons</p>
            </Link>
            
            <Link to="/question" className="quick-card">
              <div className="quick-icon">❓</div>
              <h3>Ask Questions</h3>
              <p>Get expert help with your chemistry queries</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Excel in Chemistry?</h2>
            <p>
              Join thousands of students who have improved their chemistry grades with our comprehensive resources. 
              Start your learning journey today!
            </p>
            <div className="cta-buttons">
              <Link to="/login" className="cta-btn primary">
                <i className="fas fa-sign-in-alt"></i>
                Get Started
              </Link>
              <Link to="/contact" className="cta-btn secondary">
                <i className="fas fa-envelope"></i>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources; 