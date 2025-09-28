// src/pages/Blog.jsx
import React from "react";
import Footer from "../components/Footer";

export default function Blog() {
  return (
    <div>
      <section className="container py-12">
        <h2>Blog</h2>
        <article className="post">
          <h3>Safety Tips for Using Fireworks</h3>
          <p>Always follow the instructions on the packaging. Keep water nearby and supervise children.</p>
        </article>
      </section>
      <Footer />
    </div>
  );
}
