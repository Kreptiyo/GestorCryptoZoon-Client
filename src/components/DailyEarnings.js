import React, { Component } from 'react'
import axios from 'axios';
import { CSVLink } from "react-csv";
import moment from 'moment';

export default class DailyEarnings extends Component {

    state = {
        earnings: [],
        cryptozoon_data: [],
        loaded: true
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

        this.setState({ loaded: false });
        const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/earnings');
        this.setState({ earnings: res.data });
        this.setState({ loaded: true });

    }

    deleteEarning = async (earningId) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            await axios.delete('https://gestor-cryptozoon.herokuapp.com/api/earnings/' + earningId);
            this.getEarnings();
        }

    }

    render() {
        return (
            this.state.loaded ?
                <div className="container">
                    <h1 className="text-flame"> Daily Earnings </h1>
                    <CSVLink filename={"Daily_Earnings_List.csv"} data={this.state.earnings} className="btn btn-warning btn-4 bi bi-cloud-arrow-down-fill"> Export to CSV </CSVLink>
                    <div className="table-responsive-sm">
                        <table className="table table-dark table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th><div style={{ textAlign: "center" }}>Date</div></th>
                                    <th><div style={{ textAlign: "center" }}>Zoan ID</div></th>
                                    <th><div style={{ textAlign: "center" }}>Zoon Earned</div></th>
                                    <th><div style={{ textAlign: "center" }}>Zoon to USD</div></th>
                                    <th><div style={{ textAlign: "center" }}>Actions</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.earnings.map(earning => {
                                        return (
                                            <tr key={earning._id}>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{moment(earning.createdAt).format("LLL")}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{earning.zoan_id}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{earning.zoon.toFixed(2)}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{this.state.cryptozoon_data.map(coin => ((coin.current_price * earning.zoon).toFixed(2)))}</div></td>
                                                <td><div style={{ textAlign: "center" }}><button onClick={() => this.deleteEarning(earning._id)} className="btn btn-warning bi bi-trash">Delete</button></div></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-warning m-5" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
        )
    }

}