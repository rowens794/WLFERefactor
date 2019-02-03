import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import Button from '../Elements/Button'
import Config from '../Config/config';

class ManageSubscriptions extends Component {
    constructor(props) {
        super();

        this.state = {
            userLoggedIn: false,
            user: null,
            responseMsg: null
        }
    }

    componentDidMount() {
        let userID = localStorage.getItem('userID')
        let self = this

        if (userID){
            axios.post(Config.backendRootURL + '/userCompData', {
                token: localStorage.getItem('userToken'),  //fetch the JWT from local storage
            })
            .then(function (response) {
                if (response.data.status === 'failed') {
                    self.setState({
                        // this should only be hit if user messes with token 
                        responseMsg: "Failed to indentify current user",  
                    })
                }else{
                    self.setState({ 
                        userLoggedIn: true,
                        user: response.data
                    })
                }
            })

        }else{
            self.setState({
                userLoggedIn: false
            })
        }
    }

    updateEmailPermissions() {
        let self = this

        axios.post(Config.backendRootURL + '/changeemailpref', {
            token: localStorage.getItem('userToken'),  //fetch the JWT from local storage
        })
        .then(function (response) {
            if (response.data.status === 'failed') {
                self.setState({
                    // this should only be hit if user messes with token 
                    responseMsg: "Failed to Update Email Preferences",  
                })
            }else{
                self.setState({ 
                    responseMsg: "All future emails have been disabled",
                })
            }
        })
    }

    render() {
        console.log(this.state.user)
        return (
            <div className={css(styles.notLoggedIn)}>
                { //Check if message failed
                    (this.state.userLoggedIn)
                    ? <div>
                        <Container>
                            <Row>
                                <Col 
                                    xs={{ size: 10, offset: 1 }}
                                    sm={{ size: 10, offset: 1 }}
                                    md={{ size: 8, offset: 2 }}
                                    lg={{ size: 8, offset: 2 }}
                                    xl={{ size: 8, offset: 2 }}>
                                    <p>Turning off emails will disable all weekly competition updates and reminders.  You may be susceptible to missing a weigh-in if you disable emails.</p><br />
                                    <p>Logged in as: {this.state.user.name}</p>
                                    <p>email: {this.state.user.email}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col 
                                    xs={{ size: 10, offset: 1 }}
                                    sm={{ size: 8, offset: 2 }}
                                    md={{ size: 6, offset: 3 }}
                                    lg={{ size: 4, offset: 4 }}
                                    xl={{ size: 4, offset: 4 }}>
                                        <Button onClick={() => this.updateEmailPermissions()} buttonText='turn off all emails' />
                                </Col>
                            </Row>
                            <Row>
                                <Col 
                                    xs={{ size: 10, offset: 1 }}
                                    sm={{ size: 8, offset: 2 }}
                                    md={{ size: 6, offset: 3 }}
                                    lg={{ size: 4, offset: 4 }}
                                    xl={{ size: 4, offset: 4 }}>
                                        <br/><p>{this.state.responseMsg}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div> 
                    : <div> You must be logged in to change user permissions </div> 
                } 
            </div>
        );
    }
}

export default ManageSubscriptions;

const styles = StyleSheet.create({
    notLoggedIn: {
        marginTop: '10vh',
        marginBottom: '60vh',
        textAlign: 'center',
    },
});