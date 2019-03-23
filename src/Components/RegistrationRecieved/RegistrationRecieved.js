import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';
import * as Sentry from '@sentry/browser';

import colors from '../Styling/styles';
import Config from '../Config/config';

class RegistrationRecieved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      userLoggedIn: false,
    };
    this.resendVerification = this.resendVerification.bind(this);
  }

  resendVerification(self) {
    axios
      .post(Config.backendRootURL + '/resendVerificationEmail', {
        token: localStorage.getItem('userToken'),
      })
      .then(function(response) {
        if (response.data === '{"login":"failed"}') {
          console.log('Error 1:');
        } else {
          self.setState({
            errorMessage: "A new verification email is on it's way to your inbox.",
          });
        }
      })
      .catch(function(error) {
        Sentry.captureException(error);
      });
  }

  render() {
    return (
      <div className={css(styles.RegisterSection)}>
        <div>
          <div className={css(styles.imageContainer)}>
            <img
              className={css(styles.image)}
              src="https://res.cloudinary.com/dfebwzrhb/image/upload/v1542039803/OnYourWay.png"
              alt="Focus on Results"
            />
          </div>
        </div>

        <p className={css(styles.title)}>You're Almost There</p>
        <p className={css(styles.text)}>
          We've recieved your registration. Now head over to your email client and confirm your email address to
          complete the sign-up process.
        </p>
        <br />
        {this.state.userLoggedIn ? (
          <div>
            <p className={css(styles.reminderlinkMsg)}>{this.state.errorMessage}</p>
            <p className={css(styles.reminderlink)} onClick={() => this.resendVerification(this)}>
              Click here to resend Verfication Email
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  componentWillMount() {
    console.log(localStorage.getItem('userToken'));
    if (localStorage.getItem('userToken') !== null) {
      this.setState({
        userLoggedIn: true,
      });
    }

    //log google adwords event tracking
    gtag('event', 'conversion', { send_to: 'AW-969553648/CutBCLinoZcBEPDtqM4D' });
  }
}

export default RegistrationRecieved;

const styles = StyleSheet.create({
  RegistrationRecievedSection: {
    paddingTop: '5vh',

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
    color: colors.black,
    textAlign: 'center',
    textDecoration: 'none',
    paddingBottom: '25px',
  },

  text: {
    color: colors.black,
    'font-family': 'Patrick Hand',
    fontSize: '22px',
    padding: '10px',
    margin: '0vh 20vw 5vh 20vw',
  },

  image: {
    height: '40vh',
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '5vh',
  },

  imageContainer: {
    paddingBottom: '50px',
  },
  reminderText: {
    color: colors.graphicsBlue,
    'font-family': 'Patrick Hand',
    fontSize: '20px',
  },
  reminderlink: {
    color: colors.graphicsBlue,
    'font-family': 'Patrick Hand',
    marginBottom: '100px',
    fontSize: '22px',
    ':hover': {
      color: colors.red,
      cursor: 'default',
    },
  },
  reminderlinkMsg: {
    color: colors.green,
    'font-family': 'Patrick Hand',
    fontSize: '22px',
  },
});
