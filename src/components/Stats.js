import React, { Component } from 'react'
import axios from 'axios';
import Chart from './Chart';


export default class Stats extends Component {


    state = {
        fights: [],
        earnings: [],
        cryptozoon_data: []
    }

    async componentDidMount() {
        this.getCryptoZoonData();
        this.getFights();
        this.getEarnings();
    }

    getCryptoZoonData = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cryptozoon&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        this.setState({ cryptozoon_data: res.data });
    }

    getFights = async () => {
        const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/fights');
        this.setState({ fights: res.data });
    }

    getEarnings = async () => {

        const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/earnings');
        this.setState({ earnings: res.data });

    }

    render() {
        let zoon_total_ganado = 0;
        this.state.fights.forEach(fight => {
            zoon_total_ganado += fight.zoon;
        })
        let zoon_perday = 0;
        let days = 0;
        this.state.earnings.forEach(earning => {
            zoon_perday += earning.zoon;
            days++;
        })
        return (
            <div className="card card-stats" style={{ marginTop: '10px', width: '1000px', marginLeft: '150px' }}>
                <div className="card-header">
                    Estadisticas
                </div>
                <div className="card-body body-stats">
                    <div className="row row-stats">
                        <div className="col-sm-12 col-md-3 col-lg-3">
                            <div className="c-callout c-callout-info">
                                <small className="text-muted">
                                    Zoon Ganado
                                </small>
                                <br />
                                <strong className="h4">
                                    {zoon_total_ganado}
                                </strong>
                                <br />
                                <small className="text-muted">
                                    $  {this.state.cryptozoon_data.map(coin => (
                                        (coin.current_price * zoon_total_ganado).toFixed(2)
                                    ))}
                                </small>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3">
                            <div className="c-callout c-callout-info">
                                <small className="text-muted">
                                    Avg. Zoon Earned per Day
                                </small>
                                <br />
                                <strong className="h4">
                                    {(zoon_perday / days).toFixed(2)}
                                </strong>
                                <br />
                                <small className="text-muted">
                                    $  {this.state.cryptozoon_data.map(coin => (
                                        (coin.current_price * (zoon_perday / days)).toFixed(2)
                                    ))}
                                </small>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3">
                            <div className="c-callout c-callout-info">
                                <small className="text-muted">
                                    Avg. Zoon Earned per Week
                                </small>
                                <br />
                                <strong className="h4">
                                    {((zoon_perday / days)*7).toFixed(2)}
                                </strong>
                                <br />
                                <small className="text-muted">
                                    $  {this.state.cryptozoon_data.map(coin => (
                                        (coin.current_price * ((zoon_perday / days)*7)).toFixed(2)
                                    ))}
                                </small>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3 col-lg-3">
                            <div className="c-callout c-callout-info">
                                <small className="text-muted">
                                    Avg. Zoon Earned per Month
                                </small>
                                <br />
                                <strong className="h4">
                                    {((zoon_perday / days)*30).toFixed(2)}
                                </strong>
                                <br />
                                <small className="text-muted">
                                    $  {this.state.cryptozoon_data.map(coin => (
                                       (coin.current_price * ((zoon_perday / days)*30)).toFixed(2)
                                    ))}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                Grafica Ganancias Diarias
                    <Chart/>
                </div>
            </div>
        )
    }
}