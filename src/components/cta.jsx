import React from 'react';
import '../styles/cta.scss';

export default function cta() {
  return (
    <div style={{ position: 'relative', marginTop: '3rem' }}>
      <button className="cta-button">Acheter</button>
      <span>€</span>
    </div>
  );
}
