import React from 'react';
import './FiltersBar.css';

interface FiltersBarProps {
  selectedYear: string;
  selectedType: string;
  onYearChange: (year: string) => void;
  onTypeChange: (type: string) => void;
  onClearFilters: () => void;
  availableYears: string[];
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  selectedYear,
  selectedType,
  onYearChange,
  onTypeChange,
  onClearFilters,
  availableYears
}) => {
  const types = [
    { value: '', label: 'All Types' },
    { value: 'movie', label: 'Movies' },
    { value: 'series', label: 'TV Series' },
    { value: 'episode', label: 'Episodes' }
  ];

  const hasActiveFilters = selectedYear !== '' || selectedType !== '';

  return (
    <div className="filters-bar">
      <div className="filters-container">
        <h3 className="filters-title">
          <span className="filter-icon">🔍</span>
          Filters
        </h3>
        
        <div className="filters-row">
          <div className="filter-group">
            <label htmlFor="year-filter" className="filter-label">Year</label>
            <select
              id="year-filter"
              className="filter-select"
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
            >
              <option value="">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type-filter" className="filter-label">Type</label>
            <select
              id="type-filter"
              className="filter-select"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
            >
              {types.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              className="clear-filters-btn"
              onClick={onClearFilters}
              title="Clear all filters"
            >
              <span className="clear-icon">✕</span>
              Clear Filters
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <div className="active-filters">
            <span className="active-filters-label">Active filters:</span>
            <div className="filter-tags">
              {selectedYear && (
                <span className="filter-tag">
                  Year: {selectedYear}
                  <button
                    className="remove-filter"
                    onClick={() => onYearChange('')}
                    title="Remove year filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedType && (
                <span className="filter-tag">
                  Type: {types.find(t => t.value === selectedType)?.label}
                  <button
                    className="remove-filter"
                    onClick={() => onTypeChange('')}
                    title="Remove type filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FiltersBar;