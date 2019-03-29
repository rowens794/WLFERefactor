import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import normailizeEmail from 'normalize-email';

import colors from '../../../Styling/styles';
import Button from '../../../Elements/Button';

class PlayerList extends Component {
  constructor(props) {
    super();

    this.state = {
      competitionID: '',
      date: moment(new Date()).format('M/D/YYYY'),
      token: localStorage.getItem('userToken'),
      userWeight: null,
      email: null,
      competitionData: null,
      competitionStartDate: null,
      errorMsg: null,
    };
  }

  componentDidMount() {
    this.setState({
      competitionID: this.props.competitionData._id,
      email: this.props.email,
      competitionData: this.props.competitionData,
      competitionStartDate: this.props.competitionData.StartDate,
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      competitionID: newProps.competitionData._id,
    });
  }

  componentDidUpdate(nextProps) {
    if (nextProps.competitionData !== this.state.competitionData && nextProps.competitionData !== null) {
      this.setState({
        competitionID: nextProps.competitionData._id,
        email: nextProps.email,
        competitionData: nextProps.competitionData,
        competitionStartDate: nextProps.competitionData.StartDate,
      });
    }
  }

  submitWeight(props) {
    let newWeight = parseFloat(document.getElementById('userWeight').value);

    if (isNaN(newWeight) || newWeight < 0) {
      this.setState({
        errorMsg: 'You must enter a number!',
      });
    }

    if (newWeight > 0) {
      let formattedDate = moment(new Date()).format('M/D/YYYY');
      let dateWeightObj = { [formattedDate]: newWeight };
      props.compUpdate(this.state.competitionID, dateWeightObj);
      document.getElementById('userWeight').value = '';
      this.setState({
        errorMsg: null,
      });
    }
  }

  submitInitialWeight(date, props) {
    let newWeight = parseFloat(document.getElementById('userWeight').value);

    if (isNaN(newWeight) || newWeight < 0) {
      this.setState({
        errorMsg: 'You must enter a number!',
      });
    }

    if (newWeight > 0) {
      let formattedDate = moment(new Date(date)).format('M/D/YYYY');
      let dateWeightObj = { [formattedDate]: newWeight };
      props.compUpdate(this.state.competitionID, dateWeightObj);
      document.getElementById('userWeight').value = '';
      this.setState({
        errorMsg: null,
      });
    }
  }

  getUserDoc(email, competitionData, startDate) {
    if (!email || !competitionData) return true;
    let userEmail = normailizeEmail(email);
    var players = competitionData.Players;

    for (let i = 0; i < players.length; i += 1) {
      let participantEmail = normailizeEmail(players[i][1]);
      if (participantEmail === userEmail) {
        if (players[i][2][startDate]) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  computeEndDate(start, period) {
    console.log(start);
    console.log(period);
    var days = null;
    switch (period) {
      case '8 Weeks':
        days = 8 * 7 + 1;
        break;
      case '12 Weeks':
        days = 12 * 7 + 1;
        break;
      case '16 Weeks':
        days = 16 * 7 + 1;
        break;
      default:
        days = 20 * 7 + 1;
    }
    let endDate = moment(new Date(start))
      .add(days, 'days')
      .format('M/D/YYYY');

    if (new Date() >= new Date(endDate)) {
      return true;
    } else return false;
  }

  render() {
    let startDate = moment(new Date(this.props.competitionData.StartDate)).format('M/D/YYYY');
    let initialUserWeight = this.getUserDoc(this.state.email, this.state.competitionData, startDate);
    var competitionHasEnded = false;

    if (this.state.competitionData) {
      competitionHasEnded = this.computeEndDate(
        this.props.competitionData.StartDate,
        this.props.competitionData.CompetitionLength,
      );
    }

    console.log(competitionHasEnded);

    return (
      <Container fluid style={{ padding: 0, marginTop: 0 }} className={css(styles.box)}>
        {initialUserWeight && this.state.competitionData && !competitionHasEnded ? (
          <>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col sm={{ size: 12, offset: 0 }}>
                <p className={css(styles.textBold)}>You have not yet entered a starting weight!</p>
                <p className={css(styles.text)}>Enter your weight as of {this.state.competitionStartDate}</p>
              </Col>
            </Row>

            <Row style={{ padding: 0, margin: 0 }}>
              <Col sm={{ size: 12, offset: 0 }}>
                <input id="userWeight" className={css(styles.input)} />
              </Col>
            </Row>

            <Row style={{ padding: 0, margin: 0 }}>
              <Col sm={{ size: 10, offset: 1 }}>
                <Button
                  buttonText="Submit"
                  onClick={() => this.submitInitialWeight(this.state.competitionStartDate, this.props)}
                />
              </Col>
            </Row>
          </>
        ) : !competitionHasEnded ? (
          <>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col sm={{ size: 12, offset: 0 }}>
                <p className={css(styles.text)}>Enter or update your weight for today:</p>
              </Col>
            </Row>

            <Row style={{ padding: 0, margin: 0 }}>
              <Col sm={{ size: 12, offset: 0 }}>
                <input id="userWeight" className={css(styles.input)} />
              </Col>
            </Row>

            <Row style={{ padding: 0, margin: 0 }}>
              <Col sm={{ size: 10, offset: 1 }}>
                <Button buttonText="Submit" onClick={() => this.submitWeight(this.props)} />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row style={{ padding: 0, margin: 0 }}>
              <Col sm={{ size: 12, offset: 0 }}>
                <p className={css(styles.textBold)}>This Competition Has Ended</p>
              </Col>
            </Row>
          </>
        )}
        {this.state.errorMsg ? (
          <Row style={{ padding: 0, margin: 0 }}>
            <Col sm={{ size: 12, offset: 0 }}>
              <p className={css(styles.textBold)}>{this.state.errorMsg}</p>
            </Col>
          </Row>
        ) : null}
      </Container>
    );
  }
}

export default PlayerList;

const styles = StyleSheet.create({
  text: {
    'text-align': 'center',
  },
  textBold: {
    'text-align': 'center',
    fontWeight: 'bold',
    color: colors.red,
  },
  button: {
    width: '150px',
    margin: 'auto',
    cursor: 'pointer',
    'background-color': colors.black,
    color: colors.white,
    paddingTop: '10px',
    marginTop: '15px',
    border: '1px solid' + colors.black,
    'border-radius': '3px',
  },
  input: {
    height: '35px',
    width: '90%',
    fontSize: '.9em',
    textAlign: 'center',
    border: '1px solid ' + colors.black,
    borderRadius: '10px',
  },
});
