import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function Calculator() {
  const [chart, setChart] = useState(null);
  const [chartLoaded, setChartLoaded] = useState(null);
  const [startYear, setStartYear] = useState(2012);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [yearsArray, setYearsArray] = useState([]);
  const [rangeArray, setRangeArray] = useState([]);

  const generateChart = () => {
    if (chart) chart.destroy();

    console.log(yearsArray);

    const revenue = [
      1000, 1500, 2000, 2500, 3000, 4000, 5000, 7000, 9000, 5000, 11000,
    ];

    const graph = new Chart(document.getElementById('chart-container'), {
      type: 'line',
      data: {
        labels: rangeArray,
        datasets: [
          {
            label: 'Revenue',
            data: revenue.map((data) => data),
          },
        ],
      },
    });

    setChart(graph);
    setChartLoaded(true);
  };

  const populateYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let year = startYear; year < currentYear; year++) {
      yearsArray.push(year);
    }
    setYearsArray(yearsArray);
  };

  const populateRangeArray = () => {
    console.log('coucou', startYear);
    console.log('coucou', endYear);
    const rangeArray = [];
    for (let year = startYear; year < endYear; year++) {
      rangeArray.push(year);
    }
  };

  const updateChartStartDate = ({ target }) => {
    setStartYear(target.value);
    populateRangeArray();
    generateChart();
  };

  const updateChartEndDate = ({ target }) => {
    setEndYear(target.value);
    populateRangeArray();
    generateChart();
  };

  useEffect(() => {
    populateYearsArray();
    populateRangeArray();
  }, []);

  return (
    <div>
      <p>{startYear}</p>
      <p>{endYear}</p>
      <p>{yearsArray}</p>
      <p>{rangeArray}</p>
      <select
        name="dropdown-years"
        id="dropdown-years-start"
        onChange={updateChartStartDate}
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
        onChange={updateChartEndDate}
      >
        {yearsArray.map((year) => (
          <option key={`${year}-end`} value={year}>
            {year}
          </option>
        ))}
      </select>
      <canvas id="chart-container"></canvas>
      <button onClick={() => generateChart()}>Click</button>
    </div>
  );
}
