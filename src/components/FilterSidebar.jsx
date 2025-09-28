// src/components/FilterSidebar.jsx
import React from "react";

export default function FilterSidebar({ categories = [], selected, onSelect }) {
  return (
    <aside className="filter-sidebar">
      <h4>Filter</h4>
      <ul>
        <li className={!selected ? "active" : ""} onClick={() => onSelect("")}>All</li>
        {categories.map((c) => (
          <li key={c} className={selected === c ? "active" : ""} onClick={() => onSelect(c)}>
            {c}
          </li>
        ))}
      </ul>
    </aside>
  );
}
