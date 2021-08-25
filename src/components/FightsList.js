import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment';

const getResultIcon = criterio => {
    switch (criterio) {
        case "Victory":
            return 'btn btn-success'
        case "Defeat":
            return 'btn btn-danger'
        default:
            return ''

    }
}

const limitFightsList = (zoanId, arraySize) => {
    if (zoanId == null) {
        return arraySize - 24;
    }
    else if (zoanId != null) {
        return 0;
    }
}

export default class FightsList extends Component {

    state = {
        fights: [],
        loaded: true
    }

    async componentDidMount() {
        this.getFights();
    }

    getFights = async () => {
        if (this.props.match.params.zoan_id != null) {
            this.setState({ loaded: false });
            const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/fights/byzoan/' + this.props.match.params.zoan_id);
            this.setState({ fights: res.data });
            this.setState({ loaded: true });
        }
        else {
            this.setState({ loaded: false });
            const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/fights');
            this.setState({ fights: res.data });
            this.setState({ loaded: true });
        }
    }

    deleteFight = async (fightId) => {
        if (window.confirm('Are you sure you want to delete it?')) {
            await axios.delete('https://gestor-cryptozoon.herokuapp.com/api/fights/' + fightId);
            this.getFights();
        }

    }

    render() {
        return (
            this.state.loaded ?
                <div className="container">
                    <div className="table-responsive-sm">
                        <table className="table table-dark table-hover table-bordered tabla-peleas">
                            <thead>
                                <tr>
                                    <th><div style={{ textAlign: "center" }}>Date</div></th>
                                    <th><div style={{ textAlign: "center" }}>Zoon</div></th>
                                    <th><div style={{ textAlign: "center" }}>Exp</div></th>
                                    <th><div style={{ textAlign: "center" }}>Result</div></th>
                                    <th><div style={{ textAlign: "center" }}>Fee</div></th>
                                    <th><div style={{ textAlign: "center" }}>Monster</div></th>
                                    <th><div style={{ textAlign: "center" }}>Actions</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.fights.slice(limitFightsList(this.props.match.params.zoan_id, this.state.fights.length), this.state.fights.length).map(fight => {
                                        return (
                                            <tr key={fight._id}>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{moment(fight.date).format("LLL")}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{fight.zoon}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{fight.exp}</div></td>
                                                <td><div style={{ textAlign: "center" }}><button className={getResultIcon(fight.result)}>{fight.result}</button></div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{fight.fee}</div></td>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{fight.monster}</div></td>
                                                <td><div style={{ textAlign: "center" }}><button onClick={() => this.deleteFight(fight._id)} className="btn btn-warning bi bi-trash">Delete</button></div></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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
};