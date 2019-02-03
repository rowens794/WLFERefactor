import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';

class WinnersCircle extends Component {
    
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

    calculateWinners(players, competition){

        //set relevant variables
        let totalPrizePool = competition.EntryFee * players.length
        let interimPrizeAmt = null
        let prizeAwardFreq = null

        //determine the award frequency and amount
        switch (competition.InterimPrize){
            case ('52W'):
                interimPrizeAmt = totalPrizePool * .05
                prizeAwardFreq = 14
                break
            case('54W'):
                interimPrizeAmt = totalPrizePool * .05
                prizeAwardFreq = 28
                break
            case('104W'):
                interimPrizeAmt = totalPrizePool * .1
                prizeAwardFreq = 28
                break
            default:
                interimPrizeAmt = 0
                prizeAwardFreq = null
        }

        //determine competition length
        let competitionLength = null
        switch (competition.CompetitionLength){
            case ('8 Weeks'):
                competitionLength = 8 * 7
                break
            case('12 Weeks'):
                competitionLength = 12 * 7
                break
            case('16 Weeks'):
                competitionLength = 16 * 7
                break
            case('20 Weeks'):
                competitionLength = 20 * 7
                break
            default:
                competitionLength = null
        }

        //determine the grand prize structure
        let firstPrize = null
        let secondPrize = null
        let thirdPrize = null
        let numberOfIterimPrizes = (competitionLength / prizeAwardFreq) - 1
        switch (competition.Payout){
            case ('1'):
                firstPrize = (totalPrizePool - (numberOfIterimPrizes * interimPrizeAmt)) 
                break
            case('2'):
                firstPrize = (totalPrizePool - (numberOfIterimPrizes * interimPrizeAmt)) * .75
                secondPrize = (totalPrizePool - (numberOfIterimPrizes * interimPrizeAmt)) * .25
                break
            case('3'):
                firstPrize = (totalPrizePool - (numberOfIterimPrizes * interimPrizeAmt)) * .60
                secondPrize = (totalPrizePool - (numberOfIterimPrizes * interimPrizeAmt)) * .25
                thirdPrize = (totalPrizePool - (numberOfIterimPrizes * interimPrizeAmt)) * .15
                break
            default:
                firstPrize = null
                secondPrize = null
                thirdPrize = null
        }

        //calculate dates of prize periods
        let winnerAnnouncement = []
        var [name, weightLost] = ['', null]
        if (prizeAwardFreq){ //test if interim prizes are actually awarded
            for(let j=prizeAwardFreq; j<competitionLength; j+=prizeAwardFreq){
                
                //i need to find the period start date based on j and period start date
                let periodEndDate = moment(new Date(competition.StartDate)).add(j, 'days').format("M/D/YYYY")
                let sortedPlayers = this.calculateWinnerForPeriod(this.state.playerData, periodEndDate, moment(new Date(periodEndDate)).subtract(prizeAwardFreq,'days').format("M/D/YYYY"))
                if (new Date() > new Date(periodEndDate)){
                    [name, weightLost] = sortedPlayers[0]
                }else{
                    [name, weightLost] = ['Prize not Yet Awarded', '']
                }
                winnerAnnouncement.push([periodEndDate, name, weightLost, 'Interim Prize', interimPrizeAmt])
            }
        }

        if (firstPrize){ //test if interim prizes are actually awarded
            let competitionEndDate = moment(new Date(competition.StartDate)).add(competitionLength, 'days').format("M/D/YYYY")
            let sortedPlayers = this.calculateWinnerForPeriod(this.state.playerData, competitionEndDate, moment(new Date(competition.StartDate)).format("M/D/YYYY"))
            if (new Date() > new Date(competitionEndDate)){
                [name, weightLost] = sortedPlayers[0]
            }else{
                [name, weightLost] = ['Prize not Yet Awarded', '']
            }
            winnerAnnouncement.push([competitionEndDate, name, weightLost, 'First Prize', firstPrize])
        }

        if (secondPrize){ //test if second prize is actually awarded
            let competitionEndDate = moment(new Date(competition.StartDate)).add(competitionLength, 'days').format("M/D/YYYY")
            let sortedPlayers = this.calculateWinnerForPeriod(this.state.playerData, competitionEndDate, moment(new Date(competition.StartDate)).format("M/D/YYYY"))
            if (new Date() > new Date(competitionEndDate)){
                [name, weightLost] = sortedPlayers[1]
            }else{
                [name, weightLost] = ['Prize not Yet Awarded', '']
            }
            winnerAnnouncement.push([competitionEndDate, name, weightLost, 'Second Prize', secondPrize])
        }

        if (thirdPrize){ //test if third prize is actually awarded
            let competitionEndDate = moment(new Date(competition.StartDate)).add(competitionLength, 'days').format("M/D/YYYY")
            let sortedPlayers = this.calculateWinnerForPeriod(this.state.playerData, competitionEndDate, moment(new Date(competition.StartDate)).format("M/D/YYYY"))
            if (new Date() > new Date(competitionEndDate)){
                [name, weightLost] = sortedPlayers[2]
            }else{
                [name, weightLost] = ['Prize not Yet Awarded', '']
            }
            winnerAnnouncement.push([competitionEndDate, name, weightLost, 'Third Prize', thirdPrize])
        }

        return winnerAnnouncement
    }

    calculateWinnerForPeriod(playersObj, endDate, startDate){
        //function takes in player & period params and returns the winner + weight lost for period
        let playerWeightLoss = []

        if(new Date() > new Date(endDate)){
            for(let k = 0; k < playersObj.length; k++){
                let startingWeight = playersObj[k][2][startDate]
                let endingWeight = playersObj[k][2][endDate]
                if(startingWeight && endingWeight){
                    let percentageWeightLost = (endingWeight - startingWeight) / startingWeight
                    playerWeightLoss.push([playersObj[k][0], percentageWeightLost])
                }else{
                    playerWeightLoss.push([playersObj[k][0], null])
                }
            }
    
            playerWeightLoss.sort(function (a,b) {
                return a[1] - b[1]
            })
        }else{
            playerWeightLoss.push([['Prize not Yet Awarded', '']])
        }

        return playerWeightLoss
    }


    render() {
        let winners = this.calculateWinners(this.state.playerData, this.state.competitionData)

        return (
            <div>
                <Row style={{ padding: 0, margin: 0 }}>
                    <Col sm={{ size: 12, offset: 0 }}>
                        <h3 className={css(styles.heading)}>Competition Awards</h3>
                    </Col>
                </Row>

                <Row style={{ padding: 0, margin: 0 }}>
                    <Col 
                        xs={{ size: 2, offset: 0 }}
                        sm={{ size: 2, offset: 0 }}
                        md={{ size: 2, offset: 0 }}
                        lg={{ size: 2, offset: 0 }}>
                        <p className={css(styles.header)}>Period</p>
                    </Col>

                    <Col 
                        xs={{ size: 5, offset: 0 }}
                        sm={{ size: 5, offset: 0 }}
                        md={{ size: 5, offset: 0 }}
                        lg={{ size: 5, offset: 0 }}>
                        <p className={css(styles.header)}>Player</p>
                    </Col>

                    <Col 
                        xs={{ size: 3, offset: 0 }}
                        sm={{ size: 3, offset: 0 }}
                        md={{ size: 3, offset: 0 }}
                        lg={{ size: 3, offset: 0 }}>
                        <p className={css(styles.header)}>Prize Type</p>
                    </Col>

                    <Col 
                        xs={{ size: 2, offset: 0 }}
                        sm={{ size: 2, offset: 0 }}
                        md={{ size: 2, offset: 0 }}
                        lg={{ size: 2, offset: 0 }}>
                        <p className={css(styles.header)}>Prize $</p>
                    </Col>
                </Row>

                {(winners) 
                    ? winners.map(function(week,i){
                        return (
                            <Row style={{ padding: 0, margin: 0 }} key={i}>
                                <Col 
                                    xs={{ size: 2, offset: 0 }}
                                    sm={{ size: 2, offset: 0 }}
                                    md={{ size: 2, offset: 0 }}
                                    lg={{ size: 0, offset: 0 }}>
                                    <p className={css(styles.text)}>{week[0]}</p>
                                </Col>
    
                                <Col 
                                    xs={{ size: 5, offset: 0 }}
                                    sm={{ size: 5, offset: 0 }}
                                    md={{ size: 5, offset: 0 }}
                                    lg={{ size: 5, offset: 0 }}>
                                    <p className={css(styles.text)}>{week[1]}</p>
                                </Col>
    
                                <Col 
                                    xs={{ size: 3, offset: 0 }}
                                    sm={{ size: 3, offset: 0 }}
                                    md={{ size: 3, offset: 0 }}
                                    lg={{ size: 3, offset: 0 }}>
                                    <p className={css(styles.text)}>{week[3]}</p>
                                </Col>

                                <Col 
                                    xs={{ size: 2, offset: 0 }}
                                    sm={{ size: 2, offset: 0 }}
                                    md={{ size: 2, offset: 0 }}
                                    lg={{ size: 2, offset: 0 }}>
                                    <p className={css(styles.text)}>${week[4].toFixed(2)}</p>
                                </Col>
                            </Row>
                        )
                    })
                :null}
                
            </div>
        );
    }
}

export default WinnersCircle;

const styles = StyleSheet.create({
    text: {
        'text-align': 'center',
    },
    name: {
        'text-align': 'left',
    },
    header: {
        'text-align': 'center',
        'font-weight': 'bold'
    },
    heading: {
        marginTop: '20px',
        marginBottom: '20px',
        'text-align': 'left',
    },
});