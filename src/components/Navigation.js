import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios'
import { LogoutButton } from './Logout';

export default class Navigation extends Component {
    state = {
        yakigold_data: []
    }

    async componentDidMount() {
        this.getYakiGoldData();
    }

    getYakiGoldData = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=yaki-gold&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        this.setState({ yakigold_data: res.data });
    }

    render() {
        return (
            <Navbar collapseOnSelect bg="dark" variant={"dark"} expand="lg">
                <Navbar.Brand> Gestor de Zoon 3.0</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="justify-content-center"
                        style={{ flex: 1 }}
                        navbarScroll>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="bi bi-list-stars custommarginnavigation"> Fights List</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/zoans" className="bi bi-people-fill custommarginnavigation"> Zoans</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/dailyearnings" className="bi bi-cash-coin custommarginnavigation"> Daily Earnings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/stats" className="bi bi-bar-chart-line custommarginnavigation"> Stats</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <LogoutButton />
                        </Nav.Item>
                    </Nav>
                    <span className="precio-zoon badge bg-warning text-dark">

                        YAG Price:
                        <span className="bi bi-currency-dollar">{
                            this.state.yakigold_data.map(coin => (
                                coin.current_price
                            ))
                        } </span>
                    </span>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
