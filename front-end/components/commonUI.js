import React from 'react'
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'


export class GaryNavbar extends React.Component {

    render() {
        return (
            <Navbar bg="dark" variant='dark' sticky="top">
                <Link href='/' >
                    <Navbar.Brand className='link'>
                        <img src="/logo/PCLogo-Color.svg" alt="Logo of gary planner" className="navbarLogo" />
                        Gary Planner
                    </Navbar.Brand>
                </Link>
                <Navbar.Text className='navbarItem'>
                    {this.props.children}
                </Navbar.Text>
            </Navbar>
        )
    }
}