import React, { Component } from 'react'
import axios from 'axios';

export default class CreateFight extends Component {

    state = {
        zoon: '',
        exp: '',
        result: 'Victory',
        fee: '',
        monster: 'Undead Warrior',
        _id: ''
    }

    onSubmit = async e => {
        e.preventDefault();
        const newFight = {
            zoan_id: this.props.match.params.zoan_id,
            date: Date.now(),
            zoon: this.state.zoon,
            exp: this.state.exp,
            result: this.state.result,
            fee: this.state.fee,
            monster: this.state.monster,
        };
        await axios.post('http://localhost:4000/api/fights', newFight);
        const newInfo = {
            zoon_earned: this.state.zoon,
            exp_earned: this.state.exp
        };
        await axios.put('http://localhost:4000/api/zoans/' + this.props.match.params.zoan_id, newInfo);
        window.location.href = '/zoan/' + this.props.match.params.zoan_id;
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    cancelOperation = () => {
        window.location.href = '/zoans';
    }

    render() {
        return (
            <div className="container" style={{ width: 420 }}>
                <h1 className="text-flame">New Fight</h1>
                <div className="row">
                    <div className="card card-body bg-dark mb-3 border-warning mb-3">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="mb-3">
                                    <input type="number" className="form-control" onChange={this.onInputChange} name="zoon" placeholder="Zoon" value={this.state.zoon} required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" onChange={this.onInputChange} name="exp" placeholder="Exp" value={this.state.exp} required />
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <select className="form-select" value={this.state.result} onChange={this.onInputChange} name="result" id="floatingSelect" aria-label="Floating label select example" required>
                                            <option value="Victory">Victory</option>
                                            <option value="Defeat">Defeat</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Select a Result</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" onChange={this.onInputChange} name="fee" placeholder="Fee" value={this.state.fee} required />
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <select className="form-select" value={this.state.monster} onChange={this.onInputChange} name="monster" id="floatingSelect" aria-label="Floating label select example" required>
                                            <option value="Undead Warrior">Undead Warrior</option>
                                            <option value="Zombie">Zombie</option>
                                            <option value="Mummy">Mummy</option>
                                            <option value="Skeleton Swordsman">Skeleton Swordsman</option>
                                            <option value="Skeleton Pirate">Skeleton Pirate</option>
                                            <option value="Skeleton Captain">Skeleton Captain</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Select a Monster</label>
                                    </div>
                                </div>
                                <div className="card-footer border-warning mb-1">
                                    <div className="btn-3 mb-2">
                                        <button type="submit" className="btn btn-warning">Register</button>
                                        <button className="btn btn-warning" onClick={() => this.cancelOperation()}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
