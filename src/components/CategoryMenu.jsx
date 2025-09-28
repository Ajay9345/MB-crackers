// src/components/CategoryMenu.jsx
import React from "react";

export default function CategoryMenu({ categories = [], selected, onSelect }) {
  return (
    <section id="categories" className="container categories">
      <h2>Categories</h2>
      <div className="category-grid">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`category-card ${selected === c.name ? "active" : ""}`}
            onClick={() => onSelect(c.name)}
          >
            <img src={c.image} alt={c.name} />
            <div className="cat-name">{c.name}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
