import React, { Component } from 'react'
import axios from 'axios';
import { CSVLink } from "react-csv";


export default class DailyEarnings extends Component {

    state = {
        earnings: [],
        cryptozoon_data: []
    }

    async componentDidMount() {
        this.getCryptoZoonData();
        this.getEarnings();
    }

    getCryptoZoonData = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cryptozoon&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        this.setState({ cryptozoon_data: res.data });
    }

    getEarnings = async () => {

        const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/earnings');
        this.setState({ earnings: res.data });

    }



    render() {
        return (
            <div className="table-container">
                <h1 className="text-flame"> Daily Earnings </h1>
                <CSVLink filename={"Daily_Earnings_List.csv"} data={this.state.earnings} className="btn btn-warning btn-4 bi bi-cloud-arrow-down-fill"> Export to CSV </CSVLink>
                <div className="row">
                    <div>
                        <table className="table table-dark table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th><div style={{ textAlign: "center" }}>Date</div></th>
                                    <th><div style={{ textAlign: "center" }}>Zoon</div></th>
                                    <th><div style={{ textAlign: "center" }}>Zoon to USD</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.earnings.map(earning => {
                                        return (
                                            <tr key={earning._id}>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{earning.createdAt}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{earning.zoon}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{this.state.cryptozoon_data.map(coin => ((coin.current_price * earning.zoon).toFixed(2)))}</div></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

}