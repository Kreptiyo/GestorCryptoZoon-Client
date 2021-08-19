import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
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
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Navbar.Brand>Gestor de Zoon - 3.1</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '145px' }}
                        navbarScroll>
                        <Nav.Link as={Link} to="/" className="bi bi-list-stars"> Fights List</Nav.Link>
                        <Nav.Link as={Link} to="/zoans" className="bi bi-people-fill"> Zoans</Nav.Link>
                        <Nav.Link as={Link} to="/createzoan" className="bi bi-person-plus-fill"> New Zoan</Nav.Link>
                        <Nav.Link as={Link} to="/dailyearnings" className="bi bi-cash-coin"> Daily Earnings</Nav.Link>
                    </Nav>
                    <span className="precio-zoon bi bi-currency-dollar" style={{ color: 'orange' }}>

                        Zoon Price: USD '
                        {
                            this.state.cryptozoon_data.map(coin => (
                                coin.current_price
                            ))
                        }
                        '
                    </span>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
