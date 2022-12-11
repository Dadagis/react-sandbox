import React from 'react';

export default function Calculator() {
  return (
    <div>
      <label htmlFor="date-start"></label> Start date
      <input type="date" id="date-start" />
      <label htmlFor="date-end"></label> End date
      <input type="date" id="date-end" />
    </div>
  );
}
