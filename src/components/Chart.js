import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import moment from 'moment';

const Chart = () => {
  const [chartData, setChartData] = useState({});
  const chart = () => {
    let earnDay = [];
    let earnZoon = [];
    axios
      .get("https://gestor-cryptozoon.herokuapp.com/api/earnings")
      .then(res => {
        for (const dataObj of res.data) {
          earnDay.push(moment(dataObj.createdAt).format('ll'));
          earnZoon.push(parseInt(0.075 * dataObj.zoon));
        }
        setChartData({
          labels: earnDay,
          datasets: [
            {
              label: "Zoon a USD",
              data: earnZoon,
              backgroundColor: ["rgba(255, 109, 0, 1)"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
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
                  callback: function(value, index, values){
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