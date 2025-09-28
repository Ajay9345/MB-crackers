// src/pages/About.jsx
import React from "react";
import Footer from "../components/Footer";

export default function About() {
  const values = [
    {
      icon: "🛡️",
      title: "Safety First",
      description: "Every product undergoes rigorous quality checks and meets international safety standards."
    },
    {
      icon: "🎆",
      title: "Quality Excellence",
      description: "We source only the finest fireworks from certified manufacturers in Sivakasi."
    },
    {
      icon: "🤝",
      title: "Customer Trust",
      description: "Building lasting relationships through honest business practices and reliable service."
    },
    {
      icon: "🌍",
      title: "Environmental Care",
      description: "Promoting eco-friendly fireworks that minimize environmental impact."
    }
  ];

  const milestones = [
    { year: "2008", event: "Founded Super Crackers in Sivakasi" },
    { year: "2012", event: "Expanded to online sales platform" },
    { year: "2016", event: "Reached 5,000+ satisfied customers" },
    { year: "2020", event: "Launched eco-friendly product line" },
    { year: "2024", event: "Serving 10,000+ customers nationwide" }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About MB Crackers</h1>
            <p className="about-hero-subtitle">
              Bringing joy and sparkle to your celebrations for over 3 years
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2020 in the heart of Sivakasi, MB Crackers began as a small family business 
                with a simple mission: to bring safe, high-quality fireworks to celebrations across India.
              </p>
              <p>
                What started as a local shop has grown into a trusted nationwide brand, serving over 
                10,000 satisfied customers. We've maintained our commitment to quality, safety, and 
                customer satisfaction throughout our journey.
              </p>
              <p>
                Today, we're proud to be one of the leading fireworks retailers, offering an extensive 
                collection of premium products sourced directly from Sivakasi's finest manufacturers.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span className="placeholder-icon">🏢</span>
                <p>Our Sivakasi Facility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide safe, authentic, and spectacular fireworks that create 
                unforgettable moments of joy and celebration for families across India.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>
                To be India's most trusted fireworks brand, setting the standard 
                for quality, safety, and customer satisfaction in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section 
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our growth story</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <p>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Product Varieties</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
