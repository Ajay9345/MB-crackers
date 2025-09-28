// src/pages/Contact.jsx
import React, { useState } from "react";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const whatsappNumber = "918270824023"; // Replace with your WhatsApp number
  const message = `
*New Contact Form Message* 🚀
----------------------------
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone || "N/A"}
📌 Subject: ${formData.subject}
📝 Message: ${formData.message}
`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");

  // Reset form
  setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
};


  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Our Store",
      details: [
        "207, Ayyanar Kovil, Paripatti",
        "Sivakasi, Tamil Nadu 626123",
        "India"
      ]
    },
    {
      icon: "📞",
      title: "Call Us",
      details: [
        "+91 8270824023",
        "+91 9952250308",
      ]
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: [
        "madhana211@gmail.com",
      ]
    },
    {
      icon: "🕰️",
      title: "Business Hours",
      details: [
        "Mon - Sat: 9:00 AM - 8:00 PM",
        "Sunday: 10:00 AM - 6:00 PM",
        "Festival Season: Extended Hours"
      ]
    }
  ];

  const faqs = [
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer attractive discounts for bulk orders. Contact us for custom pricing."
    },
    {
      question: "What is your delivery time?",
      answer: "We typically deliver within 3-5 business days for most locations across India."
    },
    {
      question: "Are your products safety certified?",
      answer: "All our products meet international safety standards and come with proper certifications."
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Get In Touch</h1>
            <p className="contact-hero-subtitle">
              Have questions? We're here to help you make your celebration spectacular!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-info-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-grid">
            <div className="form-content">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="bulk-order">Bulk Order</option>
                      <option value="product-info">Product Information</option>
                      <option value="complaint">Complaint</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="contact-sidebar">
              <div className="contact-card">
                <h3>Quick Response</h3>
                <p>We typically respond to all inquiries within 2-4 hours during business hours.</p>
              </div>
              
              <div className="contact-card">
                <h3>Emergency Orders</h3>
                <p>Need fireworks urgently? Call our hotline for same-day delivery in select cities.</p>
                <a href="tel:+91 8270824023" className="emergency-btn">
                  📞  8270824023
                </a>
              </div>
              
              <div className="contact-card">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">Facebook</a>
                  <a href="#" className="social-link">Instagram</a>
                  <a href="#" className="social-link">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <h2>Find Our Store</h2>
            <p>Visit us at our Sivakasi location</p>
          </div>
          <div className="map-placeholder">
            <div className="map-content">
              <div className="map-icon">🗺️</div>
              <h3>Interactive Map</h3>
              <p>207, Ayyanar Kovil, Paripatti, Sivakasi</p>
              <a href="https://maps.app.goo.gl/kPbXg1x4CeiR2oxa9" target="_blank" rel="noopener noreferrer" className="map-link">
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
