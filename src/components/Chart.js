import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import moment from 'moment';


const Chart = () => {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    let earnDay = [];
    let earnZoon = [];
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=yaki-gold&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res1 => (
        res1.data.map(zoon => (
          axios
            .get("https://gestor-cryptozoon.herokuapp.com/api/earnings")
            .then(res => {
              for (const dataObj of res.data) {
                earnDay.push(moment(dataObj.createdAt).format('ll'));
                earnZoon.push(parseInt(dataObj.yag * zoon.current_price));
              }
              setChartData({
                labels: earnDay,
                datasets: [
                  {
                    label: "USD",
                    data: earnZoon,
                    backgroundColor: ["rgba(255, 109, 0, 1)"],
                    borderWidth: 4
                  }
                ]
              });
            })
            .catch(err => {
              console.log(err);
            })
            ))
          ))
  };

useEffect(() => {
  chart();
}, []);
return (
  <div className="App">
    <div>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
                beginAtZero: true,
                callback: function(value, index, values) {
                  return '$' + value;
              }
              }
            },
            x: {
              ticks: {
                display: false
              }
            }
          }
        }}
      />
    </div>
  </div>
);
};

export default Chart;