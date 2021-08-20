import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

function DailyEarningsChart() {
    
    const [graph, setGraph] = useState([]);

    const selectChart = (e) => {
        axios.get(`https://gestor-cryptozoon.herokuapp.com/api/earnings`)
            .then(res => {
                const earningsData = res.data;
                let dayName = [];
                let earningName = [];
                earningsData.forEach(element => {
                    dayName.push(moment(element.createdAt).format('ll') + ' - ' + element._id);
                    earningName.push(element.zoon * 0.033);
                });
                setGraph({
                    labels: dayName,
                    datasets: [
                        {
                            label:'In Dollars',
                            backgroundColor: [
                                'red',
                                'green',
                                'blue'
                            ],
                            borderWidth: 0,
                            data: earningName
                        }
                    ]
                });
            });

    }
    useEffect(() => {
        selectChart();
    }, []);

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-sm-1">
                </div>
                <div className="col-sm-10" style={{background: 'white'}}>
                    <Bar
                        data={graph}
                        options={{
                            title: {
                                display: true,
                                fontSize: 20,
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default DailyEarningsChart;