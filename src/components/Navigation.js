import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios'
import { LogoutButton } from './Logout';

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
            <Navbar collapseOnSelect bg="dark" variant={"dark"} expand="lg">
                <Navbar.Brand> Gestor de Zoon - 3.1</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="justify-content-center"
                        style={{ flex: 1 }}
                        navbarScroll>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="bi bi-list-stars"> Fights List</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/zoans" className="bi bi-people-fill"> Zoans</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/dailyearnings" className="bi bi-cash-coin"> Daily Earnings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/dailyearningschart" className="bi bi-bar-chart"> Daily Earnings Chart</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <LogoutButton />
                        </Nav.Item>
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
