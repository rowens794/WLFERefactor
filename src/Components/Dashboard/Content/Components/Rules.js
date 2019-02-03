import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';

class Rules extends Component {
    constructor(props) {
        super();

        this.state = {
            competitionData: null
        }    
    }

    componentDidMount() {
        this.setState({
            competitionData: this.props.competitionData
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            competitionData: newProps.competitionData
        })
    }

    render() {
        if (this.state.competitionData){
            if(this.state.competitionData.Players){
                let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                let lengthOptions = {'8 Weeks': 56, '12 Weeks': 84, '16 Weeks': 112, '20 Weeks': 140  }
                let competitionLength = lengthOptions[this.state.competitionData.CompetitionLength]
                var finalDay = moment(new Date(this.state.competitionData.StartDate)).add(competitionLength, 'days').format('M/D/YYYY');
                var prizePool = (this.state.competitionData.EntryFee * this.state.competitionData.Players.length).toLocaleString(undefined, {maximumFractionDigits:0})
                var weeklyLogDay = weekdays[moment(new Date(this.state.competitionData.StartDate)).weekday()]

                //rule 4 switch to evaluate how to pay interim prizes
                var totalIterimPayout = 0
                var ruleFour = []
                switch(this.state.competitionData.InterimPrize) {
                    case 'None':
                        totalIterimPayout = 0
                        ruleFour = [<p key='rule41'>There will be no interim payouts during the competition</p>]
                        break;
                    case '52W':
                        totalIterimPayout = (competitionLength / 7 / 2 - 1)  * prizePool * .05
                        ruleFour = [<p key='rule42'>The biggest loser for each 2 week stretch of the competition will win <span className={css(styles.emph)}>${prizePool * .05}</span></p>]
                        break;
                    case '54W':
                        totalIterimPayout = (competitionLength / 7 / 4 - 1) * prizePool * .05
                        ruleFour = [<p key='rule43'>The biggest loser for each 4 week stretch of the competition will win <span className={css(styles.emph)}>{prizePool * .05}</span> dollars</p>]
                        break;
                    default:
                        totalIterimPayout = (competitionLength / 7 / 4 - 1) * prizePool * .10
                        ruleFour = [<p key='rule44'>The biggest loser for each 4 week stretch of the competition will win <span className={css(styles.emph)}>{prizePool * .1}</span> dollars</p>]
                }
                

                // rule 5 switch to determine how to pay overall prize (after accounting for interim prizes)
                var ruleFive = ''
                var remainingPrizePool = prizePool - totalIterimPayout
                switch(this.state.competitionData.Payout) {
                    case '1':
                        ruleFive = [<p key='rule51' >The winner of the competition will recieve $<span className={css(styles.emph)}>{remainingPrizePool} dollars</span></p>]
                        break;
                    case '2':
                        ruleFive = [<p key='rule52' >The winner of the competition will recieve $<span className={css(styles.emph)}>{remainingPrizePool * .75} dollars</span> and second place will recieve $<span className={css(styles.emph)}>{remainingPrizePool * .25} dollars</span></p>]
                        break;
                    case '3':
                        ruleFive = [<p key='rule53' >The winner of the competition will recieve $<span className={css(styles.emph)}>{remainingPrizePool * .6} dollars</span>, second place will recieve $<span className={css(styles.emph)}>{remainingPrizePool * .25} dollars</span> and third place will recieve $<span className={css(styles.emph)}>{remainingPrizePool * .15} dollars</span></p>]
                        break;
                    default:
                        ruleFive = [<p key='rule54' >The winner of the competition will recieve the prize money</p>]
                }
            }
        }

        return (
            <div>
                { //Check if message failed
                    (this.state.competitionData)
                    ?   <Container fluid style={{ padding: 0, marginTop: 0 }}>
                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col sm={{ size: 12, offset: 0 }}>
                                    <h3 className={css(styles.heading)}>Competition Rules</h3>
                                </Col>
                            </Row>

                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col 
                                    xs={{ size: 1, offset: 0 }}
                                    sm={{ size: 1, offset: 0 }}
                                    md={{ size: 1, offset: 0 }}
                                    lg={{ size: 1, offset: 0 }}
                                    >
                                    <p className={css(styles.rules)}>-</p>
                                </Col>
                                <Col 
                                    xs={{ size: 11, offset: 0 }}
                                    sm={{ size: 11, offset: 0 }}
                                    md={{ size: 11, offset: 0 }}
                                    lg={{ size: 11, offset: 0 }}
                                    >
                                    <p className={css(styles.text)}>The competition will run for <span className={css(styles.emph)}>{this.state.competitionData.CompetitionLength}</span></p>
                                </Col>
                            </Row>

                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col 
                                    xs={{ size: 1, offset: 0 }}
                                    sm={{ size: 1, offset: 0 }}
                                    md={{ size: 1, offset: 0 }}
                                    lg={{ size: 1, offset: 0 }}
                                    >
                                    <p className={css(styles.rules)}>-</p>
                                </Col>

                                <Col 
                                    xs={{ size: 11, offset: 0 }}
                                    sm={{ size: 11, offset: 0 }}
                                    md={{ size: 11, offset: 0 }}
                                    lg={{ size: 11, offset: 0 }}
                                    >
                                    <p className={css(styles.text)}>The competition begins on <span className={css(styles.emph)}>{this.state.competitionData.StartDate}</span> and ends <span className={css(styles.emph)}>{finalDay}</span></p>
                                </Col>
                            </Row>

                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col 
                                    xs={{ size: 1, offset: 0 }}
                                    sm={{ size: 1, offset: 0 }}
                                    md={{ size: 1, offset: 0 }}
                                    lg={{ size: 1, offset: 0 }}
                                    >
                                    <p className={css(styles.rules)}>-</p>
                                </Col>

                                <Col 
                                    xs={{ size: 11, offset: 0 }}
                                    sm={{ size: 11, offset: 0 }}
                                    md={{ size: 11, offset: 0 }}
                                    lg={{ size: 11, offset: 0 }}
                                    >
                                    <p className={css(styles.text)}>Each participant must log their weight each week by midnight each <span className={css(styles.emph)}>{weeklyLogDay}</span></p>
                                </Col>
                            </Row>

                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col 
                                    xs={{ size: 1, offset: 0 }}
                                    sm={{ size: 1, offset: 0 }}
                                    md={{ size: 1, offset: 0 }}
                                    lg={{ size: 1, offset: 0 }}
                                    >
                                    <p className={css(styles.rules)}>-</p>
                                </Col>

                                <Col 
                                    xs={{ size: 11, offset: 0 }}
                                    sm={{ size: 11, offset: 0 }}
                                    md={{ size: 11, offset: 0 }}
                                    lg={{ size: 11, offset: 0 }}
                                    >
                                    <p className={css(styles.text)}>Each participant will pay <span className={css(styles.emph)}>${this.state.competitionData.EntryFee}</span> to enter the competition</p>
                                </Col>
                            </Row>

                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col 
                                    xs={{ size: 1, offset: 0 }}
                                    sm={{ size: 1, offset: 0 }}
                                    md={{ size: 1, offset: 0 }}
                                    lg={{ size: 1, offset: 0 }}
                                    >
                                    <p className={css(styles.rules)}>-</p>
                                </Col>
                                <Col 
                                    xs={{ size: 11, offset: 0 }}
                                    sm={{ size: 11, offset: 0 }}
                                    md={{ size: 11, offset: 0 }}
                                    lg={{ size: 11, offset: 0 }}
                                    >
                                    <div key='rule4' className={css(styles.text)}>{ruleFour}</div>
                                </Col>
                            </Row>

                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col 
                                    xs={{ size: 1, offset: 0 }}
                                    sm={{ size: 1, offset: 0 }}
                                    md={{ size: 1, offset: 0 }}
                                    lg={{ size: 1, offset: 0 }}
                                    >
                                    <p className={css(styles.rules)}>-</p>
                                </Col>
                                <Col 
                                    xs={{ size: 11, offset: 0 }}
                                    sm={{ size: 11, offset: 0 }}
                                    md={{ size: 11, offset: 0 }}
                                    lg={{ size: 11, offset: 0 }}
                                    >
                                    <div key='rule5' className={css(styles.text)}>{ruleFive}</div>
                                </Col>
                            </Row>
                        </ Container>

                    : <div> Something went wrong </div> 
                }

                
            </div>
        );
    }
}

export default Rules;

const styles = StyleSheet.create({
    heading: {
        marginTop: '20px',
        marginBottom: '20px',
        'text-align': 'left',
    },
    rules: {
        'text-align': 'right',
        
    },
    text: {
        'text-align': 'left',
    },
    emph: {
        fontWeight: 'bold',
    },
});