import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class Navigation extends Component {
    state = {
        cryptozoon_data: []
    }

    async componentDidMount() {
        this.getCryptoZoonData();
    }

    getCryptoZoonData = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cryptozoon&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        this.setState({ cryptozoon_data: res.data });
    }
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            Gestor de Zoon - V2.0
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-card-list" to="/"> All Fights</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-people-fill" to="/zoans"> Zoans</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-plus-circle" to="/createzoan"> New Zoan</Link>
                                </li>
                                <li className="nav-link bi bi-currency-dollar" style={{color: 'orange'}}>
                                    Zoon Price: USD '
                                    {
                                        this.state.cryptozoon_data.map(coin => (
                                            coin.current_price
                                        ))
                                    }
                                    '
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
