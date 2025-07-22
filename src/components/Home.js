import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Schedule as ScheduleIcon } from '@mui/icons-material';
import BookingForm from './BookingForm';
import './Home.css';

const Home = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
  };
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-home"
        style={{
          backgroundImage: "url('/img/herohome.jpg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <div className="container-hero">
          <img 
            src="/img/logo.png" 
            alt="Richmond Tutorials Logo" 
            className="hero-logo" 
            style={{ width: '880px', height: 'auto', objectFit: 'cover' }}
          />
          <div className="hero-content-home">
            <h2>"Inspiring Success One Reaction at a Time"</h2>
            <p>
              Embark on your chemistry journey with our comprehensive online course, expertly designed to support beginners, intermediate learners, and professionals alike.
            </p>
            <Button
              variant="contained"
              size="large"
              startIcon={<ScheduleIcon />}
              onClick={handleOpenBooking}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#e36414',
                '&:hover': {
                  backgroundColor: '#d55a0f'
                },
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Book a Tutorial Session
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Chemistry Section */}
      <section className="section-white">
        <div className="container-home">
          <h3>Why Choose Chemistry?</h3>
            <p className="description-home">
              Chemistry is the science that connects and transforms life. It drives innovation in fields like medicine,
              engineering, food science, environmental solutions, and more. With over 32 years of uninterrupted teaching experience, I bring
              passion and expertise to help students succeed across GCE, IB, AP, AQA, OCR, and other curricula.
            </p>
        </div>
      </section>

      {/* Career Possibilities Section */}
      <section className="section-white">
        <div className="container-home">
          <h4>Career Possibilities</h4>
          <div className="career-grid">
            <div className="card-home">
              <i className="fas fa-pills"></i>
              <h5>Pharmaceuticals & Medicine</h5>
              <p>Develop new drugs, advance health-care, and make life-saving discoveries.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-flask"></i>
              <h5>Engineering & Materials Science</h5>
              <p>Innovate with advanced materials and nanotechnology.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-leaf"></i>
              <h5>Environmental Science</h5>
              <p>Tackle global challenges like climate change, renewable energy, and pollution control.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-fingerprint"></i>
              <h5>Forensic Science</h5>
              <p>Analyze and solve criminal cases through cutting-edge chemical analysis.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-apple-alt"></i>
              <h5>Food Science & Nutrition</h5>
              <p>Ensure food safety and enhance nutrition.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-industry"></i>
              <h5>Chemical & Petrochemical Industries</h5>
              <p>Optimize production processes and innovate sustainable solutions.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-atom"></i>
              <h5>Academic & Industrial Research</h5>
              <p>Explore unknown scientific frontiers and contribute to groundbreaking discoveries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets My Tuition Apart */}
      <section className="section-feature">
        <div className="container-home">
          <h2>What Sets My Tuition Apart?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="fas fa-bolt"></i>
              <h5>Microscopic First-Principle Logic</h5>
              <p>Master atomic and molecular principles with a deep understanding that goes beyond memorization to true comprehension.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-user-circle"></i>
              <h5>Personalized Guidance</h5>
              <p>Receive tailored lessons designed specifically for your learning style, pace, and goals to maximize your potential.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-bullseye"></i>
              <h5>Comprehensive Exam Preparation</h5>
              <p>Benefit from targeted exam strategies, extensive practice, and insider tips to excel in your assessments.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-lightbulb"></i>
              <h5>Real-World Applications</h5>
              <p>Learn through relatable, problem-solving examples that connect chemical concepts to everyday life and future careers.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-brain"></i>
              <h5>Holistic Skill Development</h5>
              <p>Build critical thinking, analytical, and problem-solving skills that shall last a lifetime.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chalkboard-teacher"></i>
              <h5>Innovative Teaching Techniques</h5>
              <p>Engage with interactive methods that make complex concepts simple and memorable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Expertise */}
      <section className="section-achievements">
        <div className="container-home">
          <h2>Achievements & Expertise</h2>
          <div className="achievements-grid">
            <div className="achievements-card">
              <i className="fas fa-clock"></i>
              <h5>32 Years of Experience</h5>
              <p>Decades of dedicated teaching, refining methods to maximize student success.</p>
            </div>
            <div className="achievements-card">
              <i className="fas fa-book"></i>
              <h5>Curriculum Mastery</h5>
              <p>Expert knowledge of GCE, IB, AP, AQA, OCR, and other international curricula.</p>
            </div>
            <div className="achievements-card">
              <i className="fas fa-user-graduate"></i>
              <h5>Student Success</h5>
              <p>Thousands of students empowered to reach their academic and career goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-home">
        <div className="contact-info" style={{ color: 'white' }}>
          <h3 style={{ color: 'white' }}>Let's Shape Your Future</h3>
          <p style={{ color: 'white' }}>
            Whether you aim to pursue medicine, engineering, research, or simply wish to achieve academic success, my chemistry tuition will ignite your passion and unlock your potential.
          </p>
          <div className="contact-details">
            <div><i className="fas fa-phone-alt"></i> +254 723-884067</div>
            <div><i className="fas fa-envelope"></i> anjiljoseph693@gmail.com</div>
            <div><i className="fas fa-globe"></i> <a href="https://richmondtutorials.edu" target="_blank" rel="noopener noreferrer">richmondtutorials.edu</a></div>
          </div>
          <hr />
          <blockquote>
            "Empowering Academic Excellence and Sucess"
          </blockquote>
        </div>
        <form className="contact-form">
          <h4>Get in Touch</h4>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" placeholder="John Doe" required />
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="you@example.com" required />
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows="4" placeholder="Tell us how we can help you..." required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Booking Form Modal */}
      <BookingForm 
        open={bookingOpen} 
        onClose={handleCloseBooking}
        tutorId="main-tutor"
        tutorName="Dr. Joseph Anjili"
      />
    </>
  );
};

export default Home;