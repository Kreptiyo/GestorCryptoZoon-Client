import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class CreateFight extends Component {

    state = {
        zoon: '',
        yag: '',
        exp: '',
        result: 'Victory',
        fee: '',
        monster: 'Spiny Snail',
        _id: ''
    }

    onSubmit = async e => {
        e.preventDefault();
        const newFight = {
            zoan_id: this.props.match.params.zoan_id,
            date: Date.now(),
            zoon: this.state.zoon,
            yag: this.state.yag,
            exp: this.state.exp,
            result: this.state.result,
            fee: this.state.fee,
            monster: this.state.monster,
        };
        await axios.post('https://gestor-cryptozoon.herokuapp.com/api/fights', newFight);
        const newInfo = {
            zoon_earned: this.state.zoon,
            yag_earned: this.state.yag,
            exp_earned: this.state.exp
        };
        await axios.put('https://gestor-cryptozoon.herokuapp.com/api/zoans/' + this.props.match.params.zoan_id, newInfo);
        Swal.fire({
            title: 'Fight saved succesfully!',
            text: 'Do you want to add another fight?',
            icon: 'success',
            showDenyButton: true,
            confirmButtonText: 'Yes'
        }).then(result => {
            if (result.isDenied) {
                this.props.history.push('/zoans');
            }
            else if (result.isConfirmed) {
                this.setState({
                    zoon: '',
                    yag: '',
                    exp: '',
                    result: 'Victory',
                    fee: '',
                    monster: 'Spiny Snail'
                })
            }
        })
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    cancelOperation = () => {
        this.props.history.push('/zoans');
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-flame">New Fight - {this.props.match.params.zoan_id}</h1>
                <div className="card-myzoan" style={{ width: 400 }}>
                    <div className="card card-body bg-dark mb-3 border-warning mb-3">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <div className="mb-3">
                                    <input type="number" className="form-control" onChange={this.onInputChange} name="zoon" placeholder="Zoon" value={this.state.zoon} required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" onChange={this.onInputChange} name="yag" placeholder="Yag" value={this.state.yag} required />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" onChange={this.onInputChange} name="exp" placeholder="Exp" value={this.state.exp} required />
                                </div>
                                <div className="mb-3">
                                    <div className="form-floating">
                                        <select className="form-select" value={this.state.result} onChange={this.onInputChange} name="result" id="floatingSelectResult" aria-label="Floating label select example" required>
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
                                        <select className="form-select" value={this.state.monster} onChange={this.onInputChange} name="monster" id="floatingSelectMonster" aria-label="Floating label select example" required>
                                            <option value="Spiny Snail">Spiny Snail</option>
                                            <option value="Batie">Batie</option>
                                            <option value="Bone Welder">Bone Welder</option>
                                            <option value="Blinker">Blinker</option>
                                            <option value="Riptide">Riptide</option>
                                            <option value="Hell Bogger">Hell Bogger</option>
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
