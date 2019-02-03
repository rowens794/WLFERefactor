import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';


class PlayerList extends Component {

    constructor(props) {
        super();

        this.state = {
            playerData: props.playerData,
            competitionData: props.competitionData,
            date: moment(new Date()).format('M/D/YYYY'),
        }    
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            playerData: nextProps.playerData,
            competitionData: nextProps.competitionData
        })
    }

    computeWeightLost(playerData){

        //check to make sure props are recieved first!!!
        if(this.state.competitionData){
            //create data structure to hold processed data
            var processedData = []

            //for each player in the competition:
            for(let i=0; i<playerData.length; i++){

                //set initial variables
                var today = moment(new Date()).format('M/D/YYYY')
                var startDate = moment(new Date(this.state.competitionData.StartDate)).format('M/D/YYYY')//get date into proper format to serve as key
                var initialWeight = playerData[i][2][startDate]

                    //get most recent weigh in
                    let keys = Object.keys(playerData[i][2])
                    var mostRecentWeight = initialWeight
                    
                    for( let j=0; j<keys.length; j++){
                        var nextDay = moment(new Date(startDate)).add(j, 'days')
                        var lookedUpWeight = playerData[i][2][nextDay.format('M/D/YYYY')]
                        
                        if (nextDay <= moment(new Date(today)) && (lookedUpWeight)) {
                            mostRecentWeight = lookedUpWeight
                        }
                    }
    
                    //get last weekly weigh in
                    var lastWeeklyWeight = initialWeight
                    for( let k=0; k<keys.length; k+=7){
                        nextDay = moment(new Date(startDate)).add(k, 'days')
                        lookedUpWeight = playerData[i][2][nextDay.format('M/D/YYYY')]
                        
                        if (nextDay <= moment(new Date(today)) && lookedUpWeight !== null){
                            lastWeeklyWeight = lookedUpWeight
                            var lastWeeklyWeighIn = nextDay.format('M/D/YYYY')
                        }
                    }
    
                    //set weight changes
                    var totalLoss = (((mostRecentWeight - initialWeight) / initialWeight) * 100).toFixed(2)
                    var weeklyLoss = 0
                    
    
                    //determine the difference between last weighin and last weekly weighin
                    //to make sure user didn't miss a weekly weigh in
                    var a = moment(new Date(today));
                    var b = moment(moment(new Date(lastWeeklyWeighIn)));
                    if (a.diff(b, 'days') > 7){
                        weeklyLoss = "MW"
                    }else{
                        weeklyLoss = (((mostRecentWeight - lastWeeklyWeight) / lastWeeklyWeight) * 100).toFixed(2)
                    }
    
                    processedData.push([playerData[i][0], weeklyLoss, totalLoss])

            }

            //sort processed data showing biggest loser at top
            const playersSortedByLoss = processedData.sort(function(a,b){
                return a[2] - b[2]
            })
            return playersSortedByLoss
        }
    }

    render() {
        
        let players = this.props.playerData
        var playersSorted =[]
        if(players.length){
            playersSorted = this.computeWeightLost(players)
        }

        return (
            <Container fluid style={{ padding: 0, marginTop: 0 }}>
                <Row style={{ padding: 0, margin: 0 }}>
                    <Col sm={{ size: 12, offset: 0 }}>
                        <h3 className={css(styles.heading)}>Current Leaderboard</h3>
                    </Col>
                </Row>

                <Row style={{ padding: 0, margin: 0 }}>
                    <Col 
                        xs={{ size: 2, offset: 0 }}
                        sm={{ size: 2, offset: 0 }}
                        md={{ size: 2, offset: 0 }}
                        lg={{ size: 2, offset: 0 }}
                        >
                        <p className={css(styles.text)}>Rank</p>
                    </Col>

                    <Col 
                        xs={{ size: 6, offset: 0 }}
                        sm={{ size: 6, offset: 0 }}
                        md={{ size: 6, offset: 0 }}
                        lg={{ size: 6, offset: 0 }}
                        >
                        <p className={css(styles.text)}>Player</p>
                    </Col>

                    <Col 
                        xs={{ size: 4, offset: 0 }}
                        sm={{ size: 4, offset: 0 }}
                        md={{ size: 4, offset: 0 }}
                        lg={{ size: 4, offset: 0 }}
                        >
                        <p className={css(styles.text)}>Total %</p>
                    </Col>
                </Row>
                <hr />

                {playersSorted.map(function(player, i){
                    return (
                        <Row style={{ padding: 0, margin: 0 }} key={i}>
                            <Col 
                                xs={{ size: 2, offset: 0 }}
                                sm={{ size: 2, offset: 0 }}
                                md={{ size: 2, offset: 0 }}
                                lg={{ size: 2, offset: 0 }}>
                                <p className={css(styles.text)}>{i+1}</p>
                            </Col>

                            <Col 
                                xs={{ size: 6, offset: 0 }}
                                sm={{ size: 6, offset: 0 }}
                                md={{ size: 6, offset: 0 }}
                                lg={{ size: 6, offset: 0 }}>
                                <p className={css(styles.text)}>{player[0]}</p>
                            </Col>

                            <Col 
                                xs={{ size: 4, offset: 0 }}
                                sm={{ size: 4, offset: 0 }}
                                md={{ size: 4, offset: 0 }}
                                lg={{ size: 4, offset: 0 }}>
                                <p className={css(styles.text)}>{player[2]}</p>
                            </Col>
                        </Row>
                    )})
                }
                

            </ Container>
        );
    }
}


export default PlayerList;

const styles = StyleSheet.create({
    text: {
        'text-align': 'center',
    },
    heading: {
        marginTop: '20px',
        marginBottom: '20px',
        'text-align': 'left',
    },
});