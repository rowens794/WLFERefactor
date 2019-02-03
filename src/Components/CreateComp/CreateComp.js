import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { Redirect } from 'react-router'
import DatePicker from "react-datepicker";
import validator from "email-validator";
import moment from 'moment';
 
import "react-datepicker/dist/react-datepicker.css";
import { MyContext } from '../ContextProvider/ContextProvider';
import Button from '../Elements/Button'
import colors from '../Styling/styles'
import Config from '../Config/config'

class CreateComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorCompName: false,
            errorStartDate: false,
            errorEntryFee: false,
            errorCompLength: false,
            errorPayout: false,
            errorInterimPrize: false,
            errorParticipants: false,
            startDate: new Date(),
            participants: [],
            errorMessage: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        let today = moment(new Date()).subtract(1,'day')
        let startDate = moment(date).startOf('day')

        console.log(startDate - today)

        if((startDate - today) <= 0){
            this.setState({
                errorMessage: 'The competition cannot have a start date prior to today'
            });
        }else{
            this.setState({
                startDate: date,
                errorMessage: null
            });
        }
    }

    addParticipant(participant) {
        let newParticipants = this.participants.push(participant)
        this.setState({
            participants: newParticipants
        });
    }

    deleteParticipant(index){
        let playerList = this.state.participants;
        console.log(index)
        playerList.splice(index, 1)
        console.log(playerList);
        this.setState({participants: playerList})
    }

    addNewParticipant(){
        document.getElementById('newParticipantEmail').style.backgroundColor = 'white';
        document.getElementById('newParticipantName').style.backgroundColor = 'white';

        let newParticipantEmail = document.getElementById('newParticipantEmail').value
        let newParticipantName = document.getElementById('newParticipantName').value

        if (!validator.validate(newParticipantEmail)){
            document.getElementById('newParticipantEmail').style.backgroundColor = colors.red;
        }

        if (newParticipantName === ''){
            document.getElementById('newParticipantName').style.backgroundColor = colors.red;
        }
        
        if (validator.validate(newParticipantEmail) && newParticipantName !== ''){
            let newParticipantList = this.state.participants
            newParticipantList.push([newParticipantName, newParticipantEmail])
            document.getElementById('newParticipantName').value = ''
            document.getElementById('newParticipantEmail').value = ''
            this.setState(newParticipantList)
        }
    }

    saveCompetition(){
        console.log('clicked')
        let CompetitionName = document.getElementById('compName').value
        let EntryFee = document.getElementById('entryFee').value
        let Payout = document.getElementById('payout').value
        let StartDate = document.getElementById('startDate').value
        let InterimPrize = document.getElementById('itermPrize').value
        let Length = document.getElementById('length').value
        let Players = this.state.participants

        let saveObject = {
            CompetitionName,
            EntryFee,
            Payout,
            StartDate,
            InterimPrize,
            Length,
            Players
        }
        console.log(saveObject)

        let errorObject = {
            errorCompName: false,
            errorStartDate: false,
            errorEntryFee: false,
            errorCompLength: false,
            errorPayout: false,
            errorInterimPrize: false,
            errorParticipants: false,
        }
        let fieldErrors = false

        //ensure fields are filled out
        if(CompetitionName === '') {
            errorObject.errorCompName = true
            fieldErrors = true
        }
        if(StartDate === '') {
            errorObject.errorStartDate = true
            fieldErrors = true
        }
        if(EntryFee === '') {
            errorObject.errorEntryFee = true
            fieldErrors = true
        }
        if(Payout === '') {
            errorObject.errorPayout = true
            fieldErrors = true
        }
        if(InterimPrize === '') {
            errorObject.errorCompLength = true
            fieldErrors = true
        }
        if(Players.length === 0) {
            errorObject.errorParticipants = true
            fieldErrors = true
        }


        //if no field errors then post data to DB
        if(!fieldErrors){
            axios.post(Config.backendRootURL+'/createCompetition', {
                    token: localStorage.getItem('userToken'),
                    competitionInfo: saveObject
            })
            .then(function (response) {
                if (response.data === '{"login":"failed"}'){
                    console.log('Error 1: add a redirect with an error message')
                }else{
                    console.log('Success: redirect to dashboard after creating competition on backend')
                    window.location.replace("/dashboard");
                }
                
            })
            .catch(function (error) {
                console.log('Error 2: add a redirect with an error message')
                console.log(error)
            });

        //if field errors did occur then update state with errors
        }else{
            this.setState({
                errorCompName: errorObject.errorCompName,
                errorStartDate: errorObject.errorStartDate,
                errorEntryFee: errorObject.errorEntryFee,
                errorCompLength: errorObject.errorCompLength,
                errorPayout: errorObject.errorPayout,
                errorInterimPrize: errorObject.errorInterimPrize,
                errorParticipants: errorObject.errorParticipants,
            })
            console.log('errors occured')
        }
    }

    render() {
        
        return (
            <MyContext.Consumer>
                {(context) => (
                    
                    (context.state.loggedIn)
                        ?   
                        <Container style={{ padding: 80 }}>

                            <Row style={{ padding: 20 }}>
                                <Col>
                                    <h2>Create a Competition</h2>
                                </Col>
                                <Col>
                                    {this.state.errorMessage &&
                                        <Row>
                                            <p className={css(styles.errorMessage)}>{this.state.errorMessage}</p>
                                        </Row>}
                                </Col>
                            </Row>

                            

                            <form onSubmit={this.handleSubmit}>
                                <Row >
                                    <Col>
                                        <div className={css(styles.itemContainer)}> 
                                            <label className={css(styles.inputLabel)}>Competition Name:<input id='compName' type="text" className={css(styles.inputBox)}/></label>
                                        </div>

                                        <div className={css(styles.itemContainer)}> 
                                            <label className={css(styles.inputLabel)}>Entry Fee:<input id='entryFee' type="text" className={css(styles.inputBox)}/></label>
                                        </div>

                                        <div className={css(styles.itemContainer)}> 
                                            <label className={css(styles.inputLabel)}>Payout Structure: 
                                                <select id="payout" className={css(styles.inputBox)}>
                                                    <option value="1">1st: 100%</option>
                                                    <option value="2">1st: 75%, 2nd: 25%</option>
                                                    <option value="3">1st: 60%, 2nd: 25%, 3rd: 15%</option>
                                                </select>
                                            </label>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div className={css(styles.itemContainer)}> 
                                            <label className={css(styles.inputLabel)}>Start Date: <DatePicker id='startDate' className={css(styles.inputBox)} selected={this.state.startDate} onChange={this.handleChange}/></label>
                                        </div>

                                        <div className={css(styles.itemContainer)}> 
                                            <label className={css(styles.inputLabel)}>Competition Length: 
                                                <select id="length" className={css(styles.inputBox)}>
                                                    <option value="8 Weeks">8 Weeks</option>
                                                    <option value="12 Weeks">12 Weeks</option>
                                                    <option value="16 Weeks">16 Weeks</option>
                                                    <option value="20 Weeks">20 Weeks</option>
                                                </select>
                                            </label>
                                        </div>

                                        <div className={css(styles.itemContainer)}> 
                                            <label className={css(styles.inputLabel)}>Interim Prizes: 
                                                <select id="itermPrize" className={css(styles.inputBox)}>
                                                    <option value="None">None</option>
                                                    <option value="52W">5% Every 2 Weeks</option>
                                                    <option value="54W">5% Every 4 Weeks</option>
                                                    <option value="104W">10% Every 4 Weeks</option>
                                                </select>
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            
                                <Row >
                                    <Col className={css(styles.addPlayerSection)}>
                                        <h4 className={css(styles.lowerHeading)}>Add Participants to the Competition</h4>
                                        <Row className={css(styles.playerList)}>
                                            <Col><input id='newParticipantName' placeholder='particpant name' className={css(styles.inputField)}></input></Col>
                                            <Col><input id='newParticipantEmail' placeholder='participant email' className={css(styles.inputField)}></input></Col>
                                            <Col><p className={css(styles.addPlayerButton)} onClick={() => this.addNewParticipant()}>add participant</p></Col>
                                        </Row>
                                        <hr />
                                        {this.state.participants.map((participant, index) => 
                                            <div key={index}>
                                                <Row className={css(styles.playerList)}>
                                                    <Col><p>{participant[0]}</p></Col>
                                                    <Col><p>{participant[1]}</p></Col>
                                                    <Col><p className={css(styles.deletePlayer)} onClick={() => this.deleteParticipant(index)}>delete participant</p></Col>
                                                </Row>
                                                <hr />
                                            </div>
                                            )}
                                    </Col>
                                </Row>

                                <Button buttonText='Create Competition' onClick={() => this.saveCompetition()} />
                                <br />
                            </form>

                        </ Container>
                
                        : <Redirect to="/"/>

                )}
            </MyContext.Consumer>
        );
    }
}

export default CreateComp;

const styles = StyleSheet.create({
    inputBox: {
        width: '250px',
        height: '35px',
        border: '1px solid ' + colors.black,
        borderRadius: '10px',
        textAlign: 'center',
        marginLeft: '20px',
        backgroundColor: colors.white,
    },
    inputLabel: {
        align: 'right',
        paddingRight: '20px',
        marginRight: '20px'
    },
    itemContainer: {
        'align-content': 'left',
        marginTop: '20px'
    },
    lowerHeading:{
        textAlign: 'left',
        marginTop: '50px',
        marginBottom: '30px'
    },
    addPlayerSection: {
        margin: '40px',
        '@media (max-width: 992px)': {
            margin: '0px',
        },
        '@media (max-width: 768px)': {
            margin: '0px',
        }
    },
    playerList: {
        margin: '10px',
        marginLeft: '30px',
        '@media (max-width: 992px)': {
            margin: '0px',
            marginLeft: '0px'
        },
        '@media (max-width: 768px)': {
            margin: '0px',
            marginLeft: '0px'
        }
    },
    deletePlayer: {
        color: colors.red,
        cursor: 'pointer',
        fontStyle: 'italic'
    },
    addPlayerButton: {
        color: colors.green,
        cursor: 'pointer',
        fontStyle: 'italic',
        '@media (max-width: 992px)': {
            marginTop: '20px',
        },
    },
    inputField:{
        height: '35px',
        width: '250px',
        fontSize: '.9em',
        textAlign: 'center',
        border: '1px solid ' + colors.black,
        borderRadius: '10px',
        '@media (max-width: 992px)': {
            width: '200px',
        },
        '@media (max-width: 768px)': {
            width: '150px',
        },
        '@media (max-width: 540px)': {
            width: '250px',
        }
    },
    CreateCompButton: {
        'width': '150px',
        float: 'right',
        cursor: 'pointer', 
        'background-color': colors.black,
        color: colors.white,
        paddingTop: '10px',
        border: '1px solid'+ colors.black,
        'border-radius': '3px',
    },
    errorMessage: {
        textAlign: 'center',
        color: colors.white,
        fontWeight: 'bold',
        backgroundColor: colors.red,
        padding: '3px',
        borderRadius: '5px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: colors.black
    }

});