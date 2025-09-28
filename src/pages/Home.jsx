// src/pages/Home.jsx
import React, { useState } from "react";
import CategoryMenu from "../components/CategoryMenu";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: 1, name: "Sparklers", image: "sparker.jpeg" },
    { id: 2, name: "Ground Chakkars", image: "chakkar.jpeg" },
    { id: 3, name: "Flower Pots", image: "flowerpot.jpeg" },
    { id: 4, name: "Rockets", image: "rocket.jpeg" },
    { id: 5, name: "Bombs", image: "bomb.jpeg" },
  ];

  const features = [
    {
      icon: "🎇",
      title: "Authentic Sivakasi Crackers",
      description: "Direct from the fireworks capital of India - genuine quality guaranteed."
    },
    {
      icon: "🛡️",
      title: "Safety Certified",
      description: "All crackers are safety tested and come with proper licensing certificates."
    },
    {
      icon: "🚚",
      title: "Doorstep Delivery",
      description: "Safe packaging and timely delivery across Tamil Nadu and neighboring states."
    },
    {
      icon: "💎",
      title: "Wholesale Prices",
      description: "Factory-direct pricing with attractive bulk discounts for retailers and events."
    }
  ];

  const testimonials = [
    {
      name: "Ravi Murugan",
      location: "Coimbatore",
      text: "MB Crackers has been our family's go-to store for 3+ years. Authentic Sivakasi quality at unbeatable prices!",
      rating: 5
    },
    {
      name: "Lakshmi Devi",
      location: "Madurai",
      text: "Excellent variety of crackers for our temple festival. Safe products and professional service always.",
      rating: 5
    },
    {
      name: "Karthik Raj",
      location: "Trichy",
      text: "Best wholesale rates in the region. MB Crackers is the most trusted name for bulk orders.",
      rating: 5
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="brand-name">MB Crackers</span><br/>
              Premium <span className="highlight">Fireworks</span> Store
            </h1>
            <p className="hero-subtitle">
              Sivakasi's trusted name for authentic, safe, and spectacular crackers. 
              Making your celebrations memorable since decades.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Satisfied Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">200+</span>
                <span className="stat-label">Cracker Varieties</span>
              </div>
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Legacy</span>
              </div>
            </div>
            <div className="hero-cta">
              <Link to="/quick-order" className="cta-primary">
                🎆 Shop Crackers
              </Link>
              <Link to="/about" className="cta-secondary">
                Our Story
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-elements">
              {/* Main Fireworks */}
              <div className="spark spark-1">🎆</div>
              <div className="spark spark-2">🎇</div>
              <div className="spark spark-3">🎆</div>
              <div className="spark spark-3">🎆</div>
              
              
              {/* Rocket Trails */}
              <div className="crackers-trail crackers-trail-1"></div>
              <div className="crackers-trail crackers-trail-2"></div>
              <div className="crackers-trail crackers-trail-3"></div>
              <div className="crackers-trail crackers-trail-3"></div>
              <div className="crackers-trail crackers-trail-3"></div>
              <div className="crackers-trail crackers-trail-3"></div>
              
              {/* Floating Particles */}
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
              
              {/* Shooting Stars */}
              <div className="shooting-star shooting-star-1"></div>
              <div className="shooting-star shooting-star-2"></div>
              <div className="shooting-star shooting-star-3"></div>
              <div className="shooting-star shooting-star-3"></div>
              <div className="shooting-star shooting-star-3"></div>
              <div className="shooting-star shooting-star-3"></div>
              
              {/* Cascading Sparkles */}
              <div className="cascade cascade-1">✨</div>
              <div className="cascade cascade-2">✨</div>
              <div className="cascade cascade-3">✨</div>
              <div className="cascade cascade-3">✨</div>
              <div className="cascade cascade-3">✨</div>
              <div className="cascade cascade-3">✨</div>
              
              {/* Rotating Wheels */}
              <div className="wheel wheel-1">🎆</div>
              <div className="wheel wheel-2">🎇</div>
              
              {/* Ground Spinners */}
              <div className="spinner spinner-1">💥</div>
              <div className="spinner spinner-2">💥</div>
              <div className="spinner spinner-2">💥</div>
              <div className="spinner spinner-2">💥</div>
              <div className="spinner spinner-2">💥</div>
              
              {/* Aerial Bursts */}
              <div className="burst burst-1">🎆</div>
              <div className="burst burst-2">🎇</div>
              <div className="burst burst-3">🎆</div>
              
              {/* Fountain Effects */}
              <div className="fountain fountain-1"></div>
              <div className="fountain fountain-2"></div>
              
              {/* Twinkling Stars */}
              <div className="twinkle twinkle-1">⭐</div>
              <div className="twinkle twinkle-2">⭐</div>
              <div className="twinkle twinkle-3">⭐</div>
              <div className="twinkle twinkle-4">⭐</div>
              <div className="twinkle twinkle-5">⭐</div>
              <div className="twinkle twinkle-5">⭐</div>
              <div className="twinkle twinkle-5">⭐</div>
              <div className="twinkle twinkle-5">⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Cracker Categories</h2>
            <p>From sparklers to sky shots - we have everything for your celebration</p>
          </div>
          <CategoryMenu
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-modern">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose MB Crackers?</h2>
            <p>Sivakasi's most trusted name for authentic and safe fireworks</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-modern">
                <div className="feature-icon-modern">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Customer Reviews</h2>
            <p>Trusted by families, retailers, and event organizers across South India</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for Your Next Celebration?</h2>
            <p>Explore our premium collection of Sivakasi crackers and make your festival unforgettable</p>
            <Link to="/quick-order" className="cta-button">
              🎆 Browse Crackers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
