import React from 'react';
import '../styles/index.scss';
import Calculator from './calculator';
import Cta from './cta';

export default function Body() {
  return (
    <div className="body">
      <h2>ROI calculator</h2>
      <Calculator />
      <Cta />
    </div>
  );
}
