import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';

import colors from '../Styling/styles';
import Button from '../Elements/Button';
import Config from '../Config/config'

class ResetPassword extends Component {

    constructor(props) {
        super();

        this.state = {
            errorMsg: ''
        }
    }

    render() {
        let setPassword = () => {
            var self = this;

            var password = document.getElementById('password').value
            var confirm = document.getElementById('password').value
            var verificationString = this.props.match.params.verificationString
            var userID = this.props.match.params.ID

            if(password===confirm){
                axios.post(Config.backendRootURL+'/setpassword', {
                    password: password,
                    verificationString: verificationString,
                    id: userID
                })
                .then(function (response) {
                    if (response.data === '{"reset":"failed"}'){
                        
                        self.setState({
                            errorMsg: 'failed to reset users password'
                        });
    
                    }else{
                        self.setState({
                            errorMsg: 'Password reset successfully. Please login.'
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    self.setState({
                        errorMsg: 'there was a problem resetting your password'
                    });
                });
            }
        }

        return (
            <div className={css(styles.RegisterSection)}>
                <div>
                    <div className={css(styles.imageContainer)}>
                        <img className={css(styles.image)} src='https://res.cloudinary.com/dfebwzrhb/image/upload/v1542039803/OnYourWay.png' alt='Focus on Results'/>
                    </div>
                </div>

                <p className={css(styles.success)}>{this.state.errorMsg}</p>
                <p className={css(styles.title)}>Set a New Password</p>

                <p className={css(styles.text)}>Password</p><input className={css(styles.input)} type="password" id="password"></input><br/><br/>
                <p className={css(styles.text)}>Confirm Password</p><input className={css(styles.input)} type="password" id="confirm"></input><br/><br/>
                <Container>
                    <Row>
                        <Col 
                            xs={{ size: 10, offset: 1 }}
                            sm={{ size: 8, offset: 2 }}
                            md={{ size: 6, offset: 3 }}
                            lg={{ size: 4, offset: 4 }}
                            xl={{ size: 4, offset: 4 }}>
                                <Button onClick={() => setPassword()} buttonText='reset password' />
                        </Col>
                    </Row>
                </Container>
            </div>
            
        );
    }
}


export default ResetPassword;

const styles = StyleSheet.create({
    RegisterSection: {

        '@media only screen and (max-width:480px)': {
            backgroundColor: colors.white ,
            margin: 'auto',
            paddingBottom: '10vh',
            'background-size': 'cover',

        },

        '@media only screen and (min-width:481px) and (max-width:768px)': {
            backgroundColor: colors.white ,
            margin: 'auto',
            padding: '5vh',
            paddingBottom: '10vh',
            'background-size': 'cover',
        },

        '@media only screen and (min-width:769px)': {
            backgroundColor: colors.white ,
            margin: 'auto',
            padding: '5vh',
            paddingBottom: '10vh',
            'background-size': 'cover',
        },
    },
    
    title: {
        'font-family': 'Patrick Hand',
        fontSize: '32px',
        color: colors.graphicsBlue,
        textAlign: 'center',
        textDecoration: 'none',
        paddingBottom: '25px'
    },

    error: {
        'font-family': 'Patrick Hand',
        fontSize: '22px',
        color: colors.red,
        textAlign: 'center',
        textDecoration: 'none',
        paddingBottom: '10px'
    },

    text: {
        '@media only screen and (max-width:480px)': {
            'width': '45%',
            'font-family': 'Patrick Hand',
            fontSize: '16px',
            float: 'left',
            'margin-left': '0%', 
            textAlign: 'right',
            paddingRight: '10px',
        },

        '@media only screen and (min-width:481px) and (max-width:768px)': {
            'width': '45%',
            'font-family': 'Patrick Hand',
            fontSize: '20px',
            float: 'left',
            'margin-left': '0%', 
            textAlign: 'right',
            paddingRight: '10px',
        },

        '@media only screen and (min-width:769px)': {
            'width': '20%',
            'font-family': 'Patrick Hand',
            fontSize: '20px',
            float: 'left',
            'margin-left': '15%', 
            textAlign: 'right',
            paddingRight: '20px',
        },
        
        '@media only screen and (min-width:1000px)': {
            'width': '20%',
            'font-family': 'Patrick Hand',
            fontSize: '20px',
            float: 'left',
            'margin-left': '22.5%', 
            textAlign: 'right',
            paddingRight: '20px',
        },

        
    },

    input: {
        '@media only screen and (max-width:480px)': {
            'width': '30%',
            float: 'left',
            'margin-right': '0%',
        },

        '@media only screen and (min-width:481px) and (max-width:768px)': {
            'width': '30%',
            float: 'left',
            'margin-right': '0%',
        },

        '@media only screen and (min-width:769px) and (max-width:1000px)': {
            'width': '40%',
            float: 'left',
            'margin-right': '25%',
        },
        '@media only screen and (min-width:1000px)': {
            'width': '20%',
            float: 'left',
            'margin-right': '0%',
        },
        
    },

    submit: {
        '@media only screen and (max-width:480px)': {
            'width': '30%',
            'margin-left': '40%',
        },

        '@media only screen and (min-width:481px) and (max-width:768px)': {
            'width': '30%',
            'margin-left': '40%',
        },

        '@media only screen and (min-width:769px) and (max-width:1000px)': {
            'width': '10%',
            'margin-left': '45%',
        },
        '@media only screen and (min-width:1000px)': {
            'width': '10%',
            'margin-left': '45%',
        },

        'font-family': 'Patrick Hand',
        float: 'left',
        cursor: 'pointer'
    },

    image: {
        height: '40vh',
        textAlign: 'center',
        margin: 'auto',
    },

    imageContainer: {
        paddingBottom: '50px',
    },

    formBody: {
        margin: '40px',
        paddingBottom: '50px'
    }

});