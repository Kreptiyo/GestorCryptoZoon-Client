import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

function getZoanImg(criterio, exp) {
    if (criterio === "Mushroom") {
        if (getZoanLvl(exp) === 1) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Mushroom_1.gif';
        }
        else if ( getZoanLvl(exp) === 2)
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Mushroom_1.gif';
        }
        else if (getZoanLvl(exp) === 3) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Mushroom_2.gif';
        }
        else if (getZoanLvl(exp) === 4) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Mushroom_2.gif';
        }
        else if (getZoanLvl(exp) === 5) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Mushroom_2.gif';
        }
    }
    if (criterio === "Rabbit") {
        if (getZoanLvl(exp) === 1) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Rabbit_1.gif';
        }
        if (getZoanLvl(exp) === 2) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Rabbit_1.gif';
        }
        if (getZoanLvl(exp) === 3) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Rabbit_3.gif'
        }
        if (getZoanLvl(exp) === 4) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Rabbit_3.gif'
        }
        if (getZoanLvl(exp) === 5) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/Rabbit_3.gif'
        }
    }
    if (criterio === "Bombeus") {
        if (getZoanLvl(exp) === 1) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/v2/turtle1_idle.gif';
        }
        if (getZoanLvl(exp) === 2) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/v2/turtle1_idle.gif';
        }
        if (getZoanLvl(exp) === 3) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/v2/turtle2_idle.gif'
        }
        if (getZoanLvl(exp) === 4) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/v2/turtle2_idle.gif'
        }
        if (getZoanLvl(exp) === 5) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/v2/turtle3_idle.gif'
        }
        if (getZoanLvl(exp) === 6) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/v2/turtle3_idle.gif'
        }
    }
    if (criterio === "Slime") {
        if (getZoanLvl(exp) === 1) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/slime_1.gif';
        }
        if (getZoanLvl(exp) === 2) 
        {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/slime_1.gif';
        }
        if (getZoanLvl(exp) === 3) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/slime_2.gif'
        }
        if (getZoanLvl(exp) === 4) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/slime_2.gif'
        }
        if (getZoanLvl(exp) === 5) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/slime_3.gif'
        }
        if (getZoanLvl(exp) === 6) {
            return 'https://raw.githubusercontent.com/cryptozoon/images/master/slime_3.gif'
        }
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
        yakigold_data: [],
        loaded: true
    }


    async componentDidMount() {
        this.getYakiGoldData();
        this.getZoans();
    }


    getYakiGoldData = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=yaki-gold&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        this.setState({ yakigold_data: res.data });
    }

    getZoans = async () => {
        this.setState({ loaded: false });
        const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/zoans')
        this.setState({
            zoans: res.data
        });
        this.setState({ loaded: true });
    }

    deleteZoan = async (zoanId) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            await axios.delete('https://gestor-cryptozoon.herokuapp.com/api/zoans/' + zoanId);
            this.getZoans();
        }
    }

    resetZoonEarned = (yag_earned) => {
            Swal.fire({
                text: 'Do you want to reset the funds of this Zoan?',
                icon: 'question',
                showDenyButton: true,
                confirmButtonText: 'Yes'
              }).then(( async result => {
                  if(result.isConfirmed)
                  {
                    await axios.patch('https://gestor-cryptozoon.herokuapp.com/api/zoans/resetzoonearned');
                    const newEarning = {
                        yag: yag_earned
                    };
                    await axios.post('https://gestor-cryptozoon.herokuapp.com/api/earnings', newEarning);
                    Swal.fire({
                        title: 'Funds reseted succesfully!',
                        text: 'Go to Daily Earnings updated?',
                        icon: 'success',
                        showDenyButton: true,
                        confirmButtonText: 'Yes'
                    }).then(( result => {
                        if(result.isConfirmed)
                        {
                            this.props.history.push('/dailyearnings');
                        }
                        else if(result.isDenied)
                        {
                            this.getZoans();
                        }
                    }))
                  }
                  else if(result.isDenied)
                  {
                      Swal.fire('Zoan funds are not reseted', '', 'info');
                  }
              }))
    }

    render() {
        let yag_ganado = 0;
        this.state.zoans.forEach(zoan => {
            yag_ganado += zoan.yag_earned;
        })
        return (
            this.state.loaded ?
                <div className="container">
                    <button className="btn btn-primary bi bi-piggy-bank" onClick={() => this.resetZoonEarned(yag_ganado)}> Reset Funds</button>
                    <div className="justify-content-center row">
                        {
                            this.state.zoans.map(zoan => (
                                <div className="text-center col-12 col-sm-12 col-md-6 col-lg-4 col-xl-1-3" key={zoan._id}>
                                    <div className="card-myzoan card text-white bg-dark mb-3 border-warning mb-3">
                                        <div className="card-header">
                                            <span className="badge rounded-pill bg-warning text-dark">#{zoan._id}</span>
                                        </div>
                                        <img alt="ZoanImg" src={getZoanImg(zoan.name, zoan.exp_earned)} className="card-img" />
                                        <div className="card-body">
                                            <h1 className="card-title"> {zoan.name} </h1>
                                            <p> Rare: {zoan.rarity}</p>
                                            <p> Tribe: {zoan.tribe}</p>
                                            <p> Level: {getZoanLvl(zoan.exp_earned)} / {zoan.exp_earned.toFixed(2)} exp</p>
                                            <p> Yag Earned: {zoan.yag_earned.toFixed(2)} | {this.state.yakigold_data.map(coin => (
                                                (coin.current_price * zoan.yag_earned).toFixed(2)
                                            ))} USD</p>
                                            <p>Updated: {moment(zoan.updatedAt).format("LLL")}</p>
                                        </div>
                                        <div className="card-footer border-warning mb-3">
                                            <div className="btn-2 mb-2">
                                                <Link to={"/zoan/" + zoan._id} className="btn btn-warning bi bi-eye-fill"> View Fights</Link>
                                                <Link to={"/createfight/" + zoan._id} className="btn btn-warning bi bi-plus-circle-fill"> Add Fight</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                :
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-warning m-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
        )
    }
}