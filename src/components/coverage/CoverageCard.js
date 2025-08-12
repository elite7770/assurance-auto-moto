import React from 'react';
import { useFormContext } from 'react-hook-form';

function CoverageCard({ name, title, description, priceLabel }) {
  const { register } = useFormContext();

  return (
    <div className="coverage-card">
      <label className="coverage-label">
        <input type="checkbox" {...register(name)} />
        <div className="coverage-content">
          <h4>{title}</h4>
          <p>{description}</p>
          <span className="coverage-price">{priceLabel}</span>
        </div>
      </label>
    </div>
  );
}

export default CoverageCard;


