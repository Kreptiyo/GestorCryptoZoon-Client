import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const getZoanImg = criterio => {
    if (criterio === "Mushroom") {
        return 'https://raw.githubusercontent.com/cryptozoon/images/master/Mushroom_2.gif';
    }
    if (criterio === "Rabbit") {
        return 'https://raw.githubusercontent.com/cryptozoon/images/master/Rabbit_3.gif';
    }
}

const getZoanLvl = exp => {
    if (exp < 100) {
        return 1;
    }
    if (exp >= 100 && exp < 350) {
        return 2;
    }
    if (exp >= 350 && exp < 1000) {
        return 3;
    }
    if (exp >= 1000 && exp < 2000) {
        return 4;
    }
    if (exp >= 2000 && exp <= 4000) {
        return 5;
    }
    if (exp >= 4000) {
        return 6;
    }
}

export default class ZoansList extends Component {

    state = {
        zoans: [],
        cryptozoon_data: []
    }


    async componentDidMount() {
        this.getCryptoZoonData();
        this.getZoans();
    }

    getCryptoZoonData = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cryptozoon&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        this.setState({ cryptozoon_data: res.data });
    }

    getZoans = async () => {
        const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/zoans')
        this.setState({
            zoans: res.data
        });
    }

    deleteZoan = async (zoanId) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            await axios.delete('https://gestor-cryptozoon.herokuapp.com/api/zoans/' + zoanId);
            this.getZoans();
        }
    }

    resetZoonEarned = async (zoanId, zoon_earned) => {
        if (window.confirm('Are you sure you want to reset the funds of this zoan?')) {
            await axios.put('https://gestor-cryptozoon.herokuapp.com/api/zoans/resetzoonearned/' + zoanId);
            const newEarning = {
                zoan_id: zoanId,
                zoon: zoon_earned
            };
            await axios.post('https://gestor-cryptozoon.herokuapp.com/api/earnings', newEarning);
            this.props.history.push('/dailyearnings');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="justify-content-center row">
                    {
                        this.state.zoans.map(zoan => (
                            <div className="text-center col-12 col-sm-12 col-md-6 col-lg-4 col-xl-1-3" key={zoan._id}>
                                <div className="card-myzoan card text-white bg-dark mb-3 border-warning mb-3">
                                    <div className="card-header">
                                        <span className="badge rounded-pill bg-warning text-dark">#{zoan._id}</span>
                                    </div>
                                    <img alt="ZoanImg" src={getZoanImg(zoan.name)} className="card-img" />
                                    <div className="card-body">
                                        <h1 className="card-title"> {zoan.name} </h1>
                                        <p> Rare: {zoan.rarity}</p>
                                        <p> Tribe: {zoan.tribe}</p>
                                        <p> Level: {getZoanLvl(zoan.exp_earned)} / {zoan.exp_earned.toFixed(2)} exp</p>
                                        <p> Class: {zoan.name} </p>
                                        <p> Zoon Earned: {zoan.zoon_earned.toFixed(2)} | {this.state.cryptozoon_data.map(coin => (
                                            (coin.current_price * zoan.zoon_earned).toFixed(2)
                                        ))} USD</p>
                                        <p>Last Update: {moment(zoan.updatedAt).format("LLL")}</p>
                                    </div>
                                    <div className="card-footer border-warning mb-3">
                                        <div className="btn-2 mb-2">
                                            <Link to={"/zoan/" + zoan._id} className="btn btn-warning bi bi-eye-fill"> View Fights</Link>
                                            <Link to={"/createfight/" + zoan._id} className="btn btn-warning bi bi-plus-circle-fill"> Add Fight</Link>
                                        </div>
                                        <button className="btn btn-danger bi bi-trash" onClick={() => this.deleteZoan(zoan._id)}> Delete</button>
                                        <button className="btn btn-primary bi bi-piggy-bank" onClick={() => this.resetZoonEarned(zoan._id, zoan.zoon_earned)}> Reset Funds</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}