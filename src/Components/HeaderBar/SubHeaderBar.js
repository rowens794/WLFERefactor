import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';
import colors from '../Styling/styles';
import LoginModal from '../LoginModal/LoginModal';
import ForgotPasswordModal from '../ForgotPasswordModal/ForgotPasswordModal';

export default class SubHeaderBar extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.loginOpen = this.loginOpen.bind(this);
        this.loginClose = this.loginClose.bind(this);
        this.forgotPassOpen = this.forgotPassOpen.bind(this);
        this.forgotPassClose = this.forgotPassClose.bind(this);
        this.logoutFunc = this.logoutFunc.bind(this);
        this.state = {
            isOpen: false,
            loginOpen: false,
            forgotPassOpen: false,
            userLoggedIn: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    loginOpen() {
        this.setState({
            loginOpen: true,
            forgotPassOpen: false
        })
    }

    loginClose() {
        this.setState({
            loginOpen: false
        })
    }

    forgotPassOpen() {
        this.setState({
            forgotPassOpen: true,
            loginOpen: false
        })
    }

    forgotPassClose() {
        this.setState({
            forgotPassOpen: false
        })
    }

    logoutFunc(){
        localStorage.removeItem('userToken');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('userID');
        this.forceUpdate();
        window.location.replace("/");
    }

    render() {

        return (
            
            <div>
                <LoginModal show={this.state.loginOpen} handleFPOpen={this.forgotPassOpen} handleClose={this.loginClose}/>
                <ForgotPasswordModal show={this.state.forgotPassOpen} handleClose={this.forgotPassClose}/>


                <Navbar color="light" light expand="md" className={css(styles.black)}>
                    <NavbarBrand href="/" className={css(styles.logo)}>FlippingTheScales</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className={'navbar-dark'}/>
                    
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {localStorage.getItem('tokenExp') > new Date().getTime()

                                ?   
                                    <React.Fragment>
                                        <NavItem>
                                            <NavLink href="/dashboard" className={css(styles.font)}>Dashboard</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/createComp" className={css(styles.font)}>Create Competition</NavLink>
                                        </NavItem>
                                        <NavItem className={css(styles.hiddenItem)}>
                                            <NavLink href="/addcompbyid" className={css(styles.font)}>Add Competition By ID</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href='/blog/' className={css(styles.font)}>Blog</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#" className={css(styles.font)} onClick={this.logoutFunc}>Log-Out</NavLink>
                                        </NavItem>
                                    </React.Fragment>


                                :    <React.Fragment>
                                        <NavItem>
                                            <NavLink href="/register" className={css(styles.font)}>Sign-Up</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="#" className={css(styles.font)} onClick={this.loginOpen}>Sign-In</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href='/blog/' className={css(styles.font)}>Blog</NavLink>
                                        </NavItem>
                                    </React.Fragment>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

}


const styles = StyleSheet.create({
    black: {
        backgroundColor: colors.black,
        zIndex: 100,
        'box-shadow': '0 0 30px #333'
    },
    font: {
        color: colors.lightBlue,
        'margin-right': '20px',
        ':hover': {
            color: colors.red,
        }
    },
    logo: {
        color: colors.lightBlue,
        'font-weight': 'bold',
        ':hover': {
            color: colors.red,
        }
    },
    hiddenItem: {
        '@media (min-width: 576px)': {
            display: 'none'
        }
    }
});