import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({ setBrand, sort, setSort }) => {
  const [brandInput, setBrandInput] = useState("");

  const handleFilter = () => {
    setBrand(brandInput.trim());
  };

  return (
    <div className="filter-bar">
      {/* фильтр брендов */}
      <div className="brand-filter">
        <label htmlFor="brandInput">Бренд:</label>
        <input
          type="text"
          id="brandInput"
          placeholder="Например: Samsung"
          value={brandInput}
          onChange={(e) => setBrandInput(e.target.value)}
        />
        <button onClick={handleFilter}>Фильтровать</button>
      </div>

      {/* сортировка */}
      <div className="sort-select">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Как есть</option>
          <option value="expensive">Сначала дорогие</option>
          <option value="cheap">Сначала дешёвые</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
