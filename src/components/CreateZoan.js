import React, { Component } from 'react'
import axios from 'axios';

export default class CreateZoan extends Component {

    state = {
        name: '',
        tribe: 'Plasmer',
        rarity: '',
        exp_earned: '',
        _id: ''
    }

    onSubmit = async e => {
        e.preventDefault();
        const newZoan = {
            name: this.state.name,
            tribe: this.state.tribe,
            rarity: this.state.rarity,
            exp_earned: this.state.exp_earned
        };
        await axios.post('https://gestor-cryptozoon.herokuapp.com/api/zoans', newZoan);

        this.props.history.push('/zoans');
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    cancelOperation = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container" style={{ width: 400 }}>
                <h1 className="text-flame">New Zoan</h1>
                <div className="row">
                    <div className="card card-body bg-dark mb-3 border-warning mb-3">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="mb-3">
                                    <input type="string" className="form-control" onChange={this.onInputChange} name="name" placeholder="Name" value={this.state.name} required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" onChange={this.onInputChange} name="exp_earned" placeholder="Exp" value={this.state.exp_earned} required />
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <select className="form-select" value={this.state.tribe} onChange={this.onInputChange} name="tribe" id="floatingSelect" aria-label="Floating label select example" required>
                                            <option value="Plasmer">Plasmer</option>
                                            <option value="Hydrein">Hydrein</option>
                                            <option value="Stonic">Stonic</option>
                                            <option value="Skyler">Skyler</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Select a Tribe</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" onChange={this.onInputChange} name="rarity" placeholder="Rare" value={this.state.rarity} required />
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
