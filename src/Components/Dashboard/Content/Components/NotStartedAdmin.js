import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container, Row, Col } from 'reactstrap';
import validator from "email-validator";
import axios from 'axios';

import Button from '../../../Elements/Button'
import colors from '../../../Styling/styles'
import Config from '../../../Config/config'

class NotStartedAdmin extends Component {
    constructor(props) {
        super();

        this.state = {
            compID: null,
            startDate: null,
            competitionName: null,
            newUserEmail: null,
            newUserName: null,
        }    
    }

    componentDidMount() {
        this.setState({
            compID: this.props.compID,
            startDate: this.props.startDate,
            competitionName: this.props.competitionName,
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            compID: newProps.compID,
            startDate: newProps.compID,
            competitionName: newProps.compID,
        })
    }

    saveCompetition(){
        console.log('clicked')
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value

        let saveObject = {
            compID: this.state.compID,
            name: name,
            email: email
        }

        let errorObject = {
            errorName: false,
            errorEmail: false,
        }
        let fieldErrors = false

        //ensure fields are filled out
        if(name === '') {
            document.getElementById('name').style.backgroundColor = colors.red
            errorObject.errorName = true
            fieldErrors = true
        }
        if(!validator.validate(email)){
            document.getElementById('email').style.backgroundColor = colors.red
            errorObject.errorEmail = true
            fieldErrors = true
        }

        console.log(fieldErrors)
        //if no field errors then post data to DB
        if(!fieldErrors){
            axios.post(Config.backendRootURL+'/addUserToComp', {
                    token: localStorage.getItem('userToken'),
                    newUser: saveObject
            })
            .then(function (response) {
                if (response.data === '{"status":"failed"}'){
                    console.log('Error 1: user has manipulated local storage or DOM elements')
                }else if (response.data === '{"status":"user alread enrolled"}'){
                    console.log('This user is already participating in the competition')
                    document.getElementById('resMessage').innerHTML = `${name} is already participating in the competition`
                    document.getElementById('name').value = ''
                    document.getElementById('email').value = ''
                }
                else if (response.data === '{"status":"success"}'){
                    console.log('Success: new user has been added to competition')
                    document.getElementById('resMessage').innerHTML = `${name} has been added the competition`
                    document.getElementById('name').value = ''
                    document.getElementById('email').value = ''
                }else{
                    console.log('Success: new user has been invited to competition')
                    document.getElementById('resMessage').innerHTML = `${name} has been invited to the competition`
                    document.getElementById('name').value = ''
                    document.getElementById('email').value = ''
                }
                
            })
            .catch(function (error) {
                console.log('Error 2: something has gone wrong')
                console.log(error)
            });

        //if field errors did occur then update state with errors
        }else{
            console.log('errors occured entering new user information')
        }
    }
    
    render() {
        return (
            <div>
                <div className={css(styles.primaryText)}>
                    The competition has not yet begun.  Be sure to sign back in on or as close to {this.state.startDate} as possible to log your starting weight.
                </div>
                <br />

                <Container className={css(styles.addUserForm)}>
                    <form>
                        <Row> 
                            <Col className={css(styles.addPlayerSection)}
                                xs={{ size: 12, offset: 0 }}
                                sm={{ size: 10, offset: 1 }}
                                md={{ size: 6, offset: 3 }}
                                lg={{ size: 6, offset: 3 }}
                                >

                                <Row>
                                    As the creator of {this.state.competitionName}, you can add new players to the competition prior to {this.state.startDate}.
                                </Row>

                                <Row className={css(styles.resMessage)}>
                                    <p className={css(styles.resMessage)} id='resMessage'></p>
                                </Row>

                                <Row className={css(styles.playerList)}>
                                    
                                    <Col><input id='name' placeholder='particpant name' className={css(styles.inputField)}></input></Col>
                                    <Col><input id='email' placeholder='participant email' className={css(styles.inputField)}></input></Col>
                                </Row>

                                <Button buttonText='Add User' onClick={() => this.saveCompetition()} />
                            </Col>
                        </Row>
                    </form>
                </Container>
            </div>
        );
    }
}

export default NotStartedAdmin;

const styles = StyleSheet.create({
    primaryText: {
        marginTop: '20px',
        marginBottom: '50px',
        'text-align': 'center',
        fontSize: '22px'
    },
    inputField:{
        height: '35px',
        width: '250px',
        fontSize: '.9em',
        textAlign: 'center',
        border: '1px solid ' + colors.black,
        borderRadius: '10px',
        margin: '5px'
    },
    resMessage:{
        'text-align': 'center',
        color: colors.green,
        margin: 'auto',
    },
    addUserForm: {
        marginBottom: '100px',
        marginTop: '25px'
    }
});