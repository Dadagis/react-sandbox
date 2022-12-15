import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function Calculator() {
  const [chart, setChart] = useState(null);
  const [startYear, setStartYear] = useState(2012);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [yearsArray, setYearsArray] = useState([]);
  const [rangeArray, setRangeArray] = useState([]);

  const generateChart = () => {
    if (chart) chart.destroy();

    const revenue = {
      2012: 1000,
      2013: 1500,
      2014: 2000,
      2015: 2500,
      2016: 3000,
      2017: 4000,
      2018: 5000,
      2019: 7000,
      2020: 9000,
      2021: 5000,
      2022: 11000,
    };

    const graph = new Chart(document.getElementById('chart-container'), {
      type: 'line',
      data: {
        labels: rangeArray,
        datasets: [
          {
            label: 'Revenue',
            data: rangeArray.map((year) => revenue[year]),
          },
        ],
      },
    });

    setChart(graph);
  };

  const populateYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = startYear; year <= currentYear; year++) {
      yearsArray.push(year);
    }
    setYearsArray(yearsArray);
  };

  const populateRangeArray = () => {
    const rangeArray = [];
    for (let year = startYear; year <= endYear; year++) {
      rangeArray.push(year);
    }
    setRangeArray(rangeArray);
  };

  useEffect(() => {
    populateYearsArray();
  }, []);

  useEffect(() => {
    if (rangeArray.length > 0) {
      generateChart();
    }
  }, [rangeArray]);

  useEffect(() => {
    populateRangeArray();
  }, [startYear, endYear]);

  return (
    <div>
      <p>{startYear}</p>
      <p>{endYear}</p>
      <p>{yearsArray}</p>
      <p>{rangeArray}</p>
      <select
        name="dropdown-years"
        id="dropdown-years-start"
        onChange={({ target }) => {
          setStartYear(Number(target.value));
        }}
      >
        {yearsArray.map((year) => (
          <option key={`${year}-start`} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        name="dropdown-years"
        id="dropdown-years-end"
        onChange={({ target }) => {
          setEndYear(Number(target.value));
        }}
      >
        {yearsArray
          .slice(0)
          .reverse()
          .map((year) => (
            <option key={`${year}-end`} value={year}>
              {year}
            </option>
          ))}
      </select>
      <canvas id="chart-container"></canvas>
    </div>
  );
}
