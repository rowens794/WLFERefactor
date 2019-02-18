import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import * as Sentry from '@sentry/browser';

import colors from '../Styling/styles';
import Button from '../Elements/Button';
import Config from '../Config/config';

class AddCompByID extends Component {
  constructor(props) {
    super();
    this.joinCompetition = this.joinCompetition.bind(this);

    this.state = {
      errorMsg: '',
    };
  }

  joinCompetition = () => {
    var self = this;
    var competitionID = document.getElementById('competitionID').value;

    axios
      .post(Config.backendRootURL + '/addCompByID', {
        competitionID: competitionID,
        userToken: localStorage.getItem('userToken'),
      })
      .then(function(response) {
        self.setState({
          errorMsg: response.data.status,
        });
        let subStringTest = response.data.status.substring(0, 15);
        if (subStringTest === 'You have been a' || subStringTest === 'You are enrolle') {
          document.getElementById('competitionID').value = '';
        }
      })
      .catch(function(error) {
        Sentry.captureException(error);
        self.setState({
          errorMsg: 'Error: Please try your request again.',
        });
      });
  };

  render() {
    return (
      <div className={css(styles.RegisterSection)}>
        <Container>
          <Row>
            <Col
              xs={{ size: 10, offset: 1 }}
              sm={{ size: 8, offset: 2 }}
              md={{ size: 8, offset: 2 }}
              lg={{ size: 8, offset: 2 }}
              xl={{ size: 8, offset: 2 }}
            >
              <p className={css(styles.headingText)}>
                Join a competition by entering the competitions ID number. You'll need to ask the competition host to
                send you this number.
              </p>
            </Col>
          </Row>
        </Container>

        <div>
          <div className={css(styles.imageContainer)}>
            <img
              className={css(styles.image)}
              src="https://res.cloudinary.com/dfebwzrhb/image/upload/v1546817028/CompetitionIDExample.jpg"
              alt="Competition ID Example"
            />
          </div>
        </div>

        <p className={css(styles.message)}>{this.state.errorMsg}</p>
        <p className={css(styles.title)}>Enter The Competition ID</p>

        <p className={css(styles.text)}>Competition ID</p>
        <input className={css(styles.input)} type="text" id="competitionID" />
        <br />
        <br />
        <Container>
          <Row>
            <Col
              xs={{ size: 10, offset: 1 }}
              sm={{ size: 8, offset: 2 }}
              md={{ size: 6, offset: 3 }}
              lg={{ size: 4, offset: 4 }}
              xl={{ size: 4, offset: 4 }}
            >
              <Button onClick={this.joinCompetition} buttonText="Join Competition" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AddCompByID;

const styles = StyleSheet.create({
  RegisterSection: {
    '@media only screen and (max-width:480px)': {
      backgroundColor: colors.white,
      margin: 'auto',
      paddingBottom: '10vh',
      'background-size': 'cover',
    },

    '@media only screen and (min-width:481px) and (max-width:768px)': {
      backgroundColor: colors.white,
      margin: 'auto',
      padding: '5vh',
      paddingBottom: '10vh',
      'background-size': 'cover',
    },

    '@media only screen and (min-width:769px)': {
      backgroundColor: colors.white,
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
    paddingBottom: '25px',
  },

  error: {
    'font-family': 'Patrick Hand',
    fontSize: '22px',
    color: colors.red,
    textAlign: 'center',
    textDecoration: 'none',
    paddingBottom: '10px',
  },
  headingText: {
    '@media only screen and (max-width:480px)': {
      'font-family': 'Patrick Hand',
      fontSize: '16px',
      color: colors.graphicsBlue,
      marginTop: '50px',
    },

    '@media only screen and (min-width:481px)': {
      'font-family': 'Patrick Hand',
      fontSize: '24px',
      color: colors.graphicsBlue,
    },
  },
  text: {
    '@media only screen and (max-width:480px)': {
      width: '45%',
      'font-family': 'Patrick Hand',
      fontSize: '16px',
      float: 'left',
      'margin-left': '0%',
      textAlign: 'right',
      paddingRight: '10px',
    },

    '@media only screen and (min-width:481px) and (max-width:768px)': {
      width: '45%',
      'font-family': 'Patrick Hand',
      fontSize: '20px',
      float: 'left',
      'margin-left': '0%',
      textAlign: 'right',
      paddingRight: '10px',
    },

    '@media only screen and (min-width:769px)': {
      width: '20%',
      'font-family': 'Patrick Hand',
      fontSize: '20px',
      float: 'left',
      'margin-left': '15%',
      textAlign: 'right',
      paddingRight: '20px',
    },

    '@media only screen and (min-width:1000px)': {
      width: '20%',
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
      width: '30%',
      float: 'left',
      'margin-right': '0%',
    },

    '@media only screen and (min-width:481px) and (max-width:768px)': {
      width: '30%',
      float: 'left',
      'margin-right': '0%',
    },

    '@media only screen and (min-width:769px) and (max-width:1000px)': {
      width: '40%',
      float: 'left',
      'margin-right': '25%',
    },
    '@media only screen and (min-width:1000px)': {
      width: '20%',
      float: 'left',
      'margin-right': '0%',
    },
  },

  submit: {
    '@media only screen and (max-width:480px)': {
      width: '30%',
      'margin-left': '40%',
    },

    '@media only screen and (min-width:481px) and (max-width:768px)': {
      width: '30%',
      'margin-left': '40%',
    },

    '@media only screen and (min-width:769px) and (max-width:1000px)': {
      width: '10%',
      'margin-left': '45%',
    },
    '@media only screen and (min-width:1000px)': {
      width: '10%',
      'margin-left': '45%',
    },

    'font-family': 'Patrick Hand',
    float: 'left',
    cursor: 'pointer',
  },

  image: {
    height: '40vh',
    maxWidth: '95%',
    textAlign: 'center',
    margin: 'auto',
    'box-shadow': '10px 10px 5px grey',
  },

  imageContainer: {
    paddingBottom: '50px',
  },

  formBody: {
    margin: '40px',
    paddingBottom: '50px',
  },
  forgotPass: {
    marginTop: '25px',
  },
  message: {
    color: colors.green,
    fontWeight: 'bold',
  },
});
