import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function Calculator() {
  const [chart, setChart] = useState(null);
  const [startYear, setStartYear] = useState(2013);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [yearsArray, setYearsArray] = useState([]);
  const [rangeArray, setRangeArray] = useState([]);
  const [revenue, setRevenue] = useState({});
  const [dataFetched, setDataFecthed] = useState(false);
  const [baseData, setBaseData] = useState({
    2013: 550.8385,
    2014: 262.3083,
    2015: 397.2716000000001,
    2016: 918.5690623894318,
    2017: 12364.1244485488,
    2018: 3330.3767937287744,
    2019: 6462.806847075976,
    2020: 23445.60952998802,
    2021: 41672.35465483228,
  });

  const generateChart = () => {
    if (chart) chart.destroy();

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

    setDataFecthed(false);
    setChart(graph);
  };

  const fetchData = async () => {
    let newData = {};
    yearsArray.forEach((year) => {
      if (year in baseData || year in revenue) {
        console.log('ON A LA DATA');
        newData[year] = baseData[year];
      } else {
        console.log('ON A PAS LA DATA');
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${formatDate(
              year
            )}&localization=false`,
            { headers: { 'Access-Control-Allow-Origin': '*' } }
          )
          .then(function (response) {
            newData[year] = response.data.market_data.current_price.eur;
            setDataFecthed(true);
          })
          .catch(function (error) {
            console.log('error', error);
          });
      }
    });
    setRevenue(newData);
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
    fetchData();
  }, [rangeArray]);

  useEffect(() => {
    if (rangeArray.length > 0 && Object.keys(revenue).length > 0) {
      generateChart();
    }
  }, [revenue, dataFetched]);

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
