import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function Calculator() {
  const [chart, setChart] = useState(null);
  const [startYear, setStartYear] = useState(2021);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [yearsArray, setYearsArray] = useState([]);
  const [rangeArray, setRangeArray] = useState([]);
  const [revenue, setRevenue] = useState({});

  const generateChart = () => {
    if (chart) chart.destroy();

    console.log(revenue);

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

  const fetchData = async () => {
    yearsArray.forEach((year) => {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${formatDate(
            year
          )}&localization=false`,
          { headers: { 'Access-Control-Allow-Origin': '*' } }
        )
        .then(function (response) {
          // handle success
          revenue[year] = response.data.market_data.current_price.eur;
        })
        .catch(function (error) {
          // handle error
          console.log('error', error);
        });
    });
  };

  const formatDate = (year) => {
    if (year === new Date().getFullYear()) {
      return new Date().toLocaleDateString().replaceAll('/', '-');
    } else {
      return new Date(`${year}-12-31`)
        .toLocaleDateString()
        .replaceAll('/', '-');
    }
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
      fetchData();
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
