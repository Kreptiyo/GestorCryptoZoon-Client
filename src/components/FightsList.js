import React, { Component } from 'react'
import axios from 'axios';
import { CSVLink } from "react-csv";

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

const getTitle = criterio => {
    if(criterio != null)
    {
        return 'Fights List of ' + criterio;
    }
    else
    {
        return 'Fights List';
    }
}

export default class FightsList extends Component {

    state = {
        fights: []
    }

    async componentDidMount() {
        this.getFights();
    }


    getFights = async () => {
        if(this.props.match.params.zoan_id != null)
        {
            const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/fights/byzoan/' + this.props.match.params.zoan_id);
            this.setState({ fights: res.data });
        }
        else
        {
            const res = await axios.get('https://gestor-cryptozoon.herokuapp.com/api/fights');
            this.setState({ fights: res.data });
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
            <div className="table-container">
                <h1 className="text-flame"> {getTitle(this.props.match.params.zoan_id)} </h1>
                <CSVLink filename={"Fights_List.csv"} data={this.state.fights} className="btn btn-warning btn-4 bi bi-cloud-arrow-down-fill"> Export to CSV </CSVLink>
                <div className="row">
                    <div>
                        <table className="table table-dark table-hover table-bordered">
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
                                    this.state.fights.map(fight => {
                                        return (
                                            <tr key={fight._id}>
                                                <td><div style={{ textAlign: "center", margin: '10px' }}>{fight.date}</div></td>
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
            </div>
        )
    }
}
