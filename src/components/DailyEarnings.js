import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';

export default class DailyEarnings extends Component {

    state = {
        earnings: [],
        cryptozoon_data: [],
        yakigold_data: [],
        loaded: true
    }

    async componentDidMount() {
        this.getCryptoZoonData();
        this.getYakiGoldData();
        this.getEarnings();
    }

    getCryptoZoonData = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cryptozoon&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        this.setState({ cryptozoon_data: res.data });
    }

    getYakiGoldData = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=yaki-gold&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        this.setState({ yakigold_data: res.data });
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
                    <div className="table-responsive-sm">
                        <table className="table table-dark table-hover table-bordered tabla-peleas">
                            <thead>
                                <tr>
                                    <th><div style={{ textAlign: "center" }}>Date</div></th>
                                    <th><div style={{ textAlign: "center" }}>Zoon Earned</div></th>
                                    <th><div style={{ textAlign: "center" }}>Zoon to USD</div></th>
                                    <th><div style={{ textAlign: "center" }}>Yag Earned</div></th>
                                    <th><div style={{ textAlign: "center" }}>Yag to USD</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.earnings.map(earning => {
                                        return (
                                            <tr key={earning._id}>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{moment(earning.createdAt).format("LLL")}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{earning.zoon.toFixed(2)}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{this.state.cryptozoon_data.map(coin => ((coin.current_price * earning.zoon).toFixed(2)))}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{earning.yag.toFixed(2)}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{this.state.yakigold_data.map(coin => ((coin.current_price * earning.yag).toFixed(2)))}</div></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div className="d-flex justify-content-center ">
                    <div className="spinner-border text-warning m-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
        )
    }

}