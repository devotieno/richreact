import React, { useState } from 'react';
import './Pricing.css';

const Pricing = () => {
  const [activeTab, setActiveTab] = useState('per-session');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pricing-page">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
      <section className="hero-pricing">
        <h1>Master Chemistry with Professional Tutoring</h1>
        <p>Personalized tutoring across all chemistry curricula, from fundamentals to advanced topics.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => scrollToSection('booking-section')}>Book a Session</button>
          <button className="btn-secondary" onClick={() => scrollToSection('pricing-section')}>View Pricing</button>
        </div>
        <div className="features">
          <div className="feature-item">
            <i className="fas fa-user-graduate"></i>
            <h3>Expert Tutor</h3>
            <p>Advanced degree in Chemistry with years of teaching experience</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-book"></i>
            <h3>All Curricula</h3>
            <p>Support for all major chemistry curricula and exam preparation</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-clock"></i>
            <h3>Flexible Timing</h3>
            <p>Book sessions at your convenience, including evenings and weekends</p>
          </div>
        </div>
      </section>
      <section id="booking-section" className="booking-section">
        <h2>Book Your Tutoring Session</h2>
        <p>Select a day and time that works for you, and fill in your details to book your chemistry tutoring session.</p>
        <div className="booking-box">
          <div className="left-panel">
            <h4>Select Day & Time</h4>
            <div className="days">
              <button className="day-btn active">Mon</button>
              <button className="day-btn">Tue</button>
              <button className="day-btn">Wed</button>
              <button className="day-btn">Thu</button>
              <button className="day-btn">Fri</button>
              <button className="day-btn">Sat</button>
              <button className="day-btn">Sun</button>
            </div>
            <h5>Available Time Slots</h5>
            <div className="time-slots">
              <button className="time-btn active">9:00 AM</button>
              <button className="time-btn">10:30 AM</button>
              <button className="time-btn">1:00 PM</button>
              <button className="time-btn">2:30 PM</button>
              <button className="time-btn">4:00 PM</button>
              <button className="time-btn">5:30 PM</button>
            </div>
          </div>
          <div className="right-panel">
            <form id="bookingForm">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="text" placeholder="e.g., Organic Chemistry, Thermodynamics" required />
              <button type="submit" className="btn-primary">Confirm Booking</button>
            </form>
          </div>
        </div>
      </section>
      <section id="pricing-section" className="pricing">
        <h2>Simple, Transparent Pricing</h2>
        <p>Choose the tutoring package that best fits your learning needs</p>
        <div className="pricing-tabs">
          <button
            className={`tab-button${activeTab === 'per-session' ? ' active' : ''}`}
            onClick={() => setActiveTab('per-session')}
          >
            Pay Per Session
          </button>
          <button
            className={`tab-button${activeTab === 'monthly' ? ' active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly Subscription
          </button>
        </div>
        {activeTab === 'per-session' && (
        <div className="pricing-options" id="per-session-options">
          <div className="card-pricing">
            <h3>Single Session</h3>
            <p className="price">$45<span>/1 hour</span></p>
            <p className="description">Perfect for tackling a specific topic or question</p>
            <ul>
              <li>One on one tutoring</li>
              <li>Focus on specific topics</li>
              <li>Pre session materials</li>
              <li>Post session notes</li>
              <li>Email support for 24 hours</li>
            </ul>
            <button className="btn-secondary">Book Now</button>
          </div>
          <div className="card-pricing featured">
            <span className="popular-label">Popular</span>
            <h3>Weekly Package</h3>
            <p className="price">$160<span>/4 hours</span></p>
            <p className="description">Consistent support throughout your studies</p>
            <ul>
              <li>Four 1 hour sessions</li>
              <li>Comprehensive topic coverage</li>
              <li>Pre session materials</li>
              <li>Post session notes</li>
              <li>Email support</li>
              <li>Homework review</li>
              <li>10% discount on package</li>
            </ul>
            <button className="btn-primary">Book Now</button>
          </div>
          <div className="card-pricing">
            <h3>Intensive Package</h3>
            <p className="price">$320<span>/10 hours</span></p>
            <p className="description">Deep dive for exam preparation or challenging concepts</p>
            <ul>
              <li>Ten 1 hour sessions</li>
              <li>Comprehensive curriculum coverage</li>
              <li>Custom study plan</li>
              <li>Practice exams</li>
              <li>Advanced problem sets</li>
              <li>Unlimited email support</li>
              <li>Progress tracking</li>
              <li>20% discount on package</li>
            </ul>
            <button className="btn-secondary">Book Now</button>
          </div>
        </div>
        )}
        {activeTab === 'monthly' && (
          <div className="pricing-options" id="monthly-options">
          <div className="card-pricing featured">
            <span className="popular-label">Best Value</span>
            <h3>Monthly Standard</h3>
            <p className="price">$350<span>/month</span></p>
            <p className="description">Up to 3 hours of tutoring per day. Ideal for steady progress and ongoing support.</p>
            <ul>
              <li>3 x 21-days sessions/month</li>
              <li>Flexible scheduling</li>
              <li>Homework & exam help</li>
              <li>Email support</li>
              <li>Session rollover (1 month)</li>
              <li>Progress tracking</li>
            </ul>
            <button className="btn-primary">Subscribe</button>
          </div>
          <div className="card-pricing">
            <h3>Monthly Premium</h3>
            <p className="price">$600<span>/month</span></p>
            <p className="description">Up to 4 hours of tutoring per day. Perfect for exam prep or intensive study.</p>
            <ul>
              <li>4 x 28-days sessions/month</li>
              <li>Priority scheduling</li>
              <li>All Standard features</li>
              <li>Unlimited email support</li>
              <li>Practice exams & feedback</li>
              <li>Custom study plan</li>
            </ul>
            <button className="btn-secondary">Subscribe</button>
          </div>
        </div>
        )}
        <div className="custom-package">
          <p>Need a Custom Plan?</p>
          <p>If you need specialized tutoring for advanced topics or have specific requirements, contact us for a tailored plan.</p>
          <button className="btn-secondary">Contact for Custom Package</button>
        </div>
      </section>
      <section className="testimonials">
        <h2>What My Students Say</h2>
        <p>Discover what students have to say about their tutoring experience and the results they've achieved.</p>
        <div className="overall-rating">
          ★★★★★ <span>4.9 overall rating</span>
        </div>
        <div className="reviews-grid">
          <div className="review-card">
            <p className="review-text">“The tutoring sessions helped me understand reaction mechanisms that I had been struggling with for weeks. My exam grades improved significantly.”</p>
            <p className="reviewer-name"><strong>Alex Johnson</strong></p>
            <p className="reviewer-course">Organic Chemistry</p>
          </div>
          <div className="review-card">
            <p className="review-text">“At a first-year student, I was overwhelmed by chemistry concepts. The step-by-step explanations made everything so much clearer. Highly recommend.”</p>
            <p className="reviewer-name"><strong>Sarah Williams</strong></p>
            <p className="reviewer-course">General Chemistry</p>
          </div>
          <div className="review-card">
            <p className="review-text">“Thermodynamics seemed impossible until I started these tutoring sessions. The tutor has a gift for making complex topics understandable.”</p>
            <p className="reviewer-name"><strong>Michael Chen</strong></p>
            <p className="reviewer-course">Physical Chemistry</p>
          </div>
          <div className="review-card">
            <p className="review-text">“The tutoring helped me connect biochemistry concepts to my pre-med studies. The real-world applications made the material much more engaging.”</p>
            <p className="reviewer-name"><strong>Erica Rodriguez</strong></p>
            <p className="reviewer-course">Biochemistry</p>
          </div>
          <div className="review-card">
            <p className="review-text">“I was falling behind in my inorganic chemistry class until I started these sessions. Now I'm one of the top students in my class.”</p>
            <p className="reviewer-name"><strong>James Wilson</strong></p>
            <p className="reviewer-course">Inorganic Chemistry</p>
          </div>
          <div className="review-card">
            <p className="review-text">“The exam preparation strategies were invaluable. I earned a 5 on my AP Chemistry exam thanks to the focused tutoring.”</p>
            <p className="reviewer-name"><strong>Olivia Martinez</strong></p>
            <p className="reviewer-course">AP Chemistry</p>
          </div>
        </div>
      </section>
      <section className="feedback">
        <h2>Share Your Experience</h2>
        <p>Your feedback helps improve the tutoring experience and assists other students in making informed decisions.</p>
        <div className="feedback-form-container">
          <p>How would you rate your tutoring experience?</p>
          <div className="star-rating">
            <span className="star" data-value="1">★</span>
            <span className="star" data-value="2">★</span>
            <span className="star" data-value="3">★</span>
            <span className="star" data-value="4">★</span>
            <span className="star" data-value="5">★</span>
          </div>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
            <select>
              <option selected disabled>Select Course</option>
              <option value="organic">Organic Chemistry</option>
              <option value="physical">Physical Chemistry</option>
              <option value="analytical">Analytical Chemistry</option>
              <option value="general">General Chemistry</option>
              <option value="biochemistry">Biochemistry</option>
              <option value="inorganic">Inorganic Chemistry</option>
              <option value="ap">AP Chemistry</option>
            </select>
            <textarea placeholder="Your Feedback"></textarea>
            <button type="submit" className="btn-primary">Submit Feedback</button>
          </form>
        </div>
      </section>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const perSession = document.getElementById('per-session-options');
  const monthly = document.getElementById('monthly-options');
  tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          tabButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (btn.dataset.tab === 'per-session') {
              perSession.style.display = '';
              monthly.style.display = 'none';
          } else {
              perSession.style.display = 'none';
              monthly.style.display = '';
          }
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
const header = document.querySelector('.main-header');
const hero = document.querySelector('.hero');
// Assume Richmond tutorial card has id="richmond-tutorial"
const richmondTutorial = document.getElementById('RICHMOND TUTORIALS');
if (!header || !hero) return;

// Get the bottom position of the hero section
const heroBottom = hero.offsetTop + hero.offsetHeight;

window.addEventListener('scroll', function() {
if (window.scrollY >= heroBottom) {
  header.classList.add('sticky');
  if (richmondTutorial) richmondTutorial.style.display = 'none';
} else {
  header.classList.remove('sticky');
  if (richmondTutorial) richmondTutorial.style.display = '';
}
});
});

export default Pricing; 