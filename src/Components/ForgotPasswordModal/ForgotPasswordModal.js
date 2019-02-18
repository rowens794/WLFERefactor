import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import colors from '../Styling/styles';
import Button from '../Elements/Button';
import Config from '../Config/config';

class ForgotPasswordModal extends Component {
  constructor(props) {
    super();
    this.handleClose = this.handleClose.bind();

    this.state = {
      message: '',
    };
  }

  updatePassword = function() {
    var username = document.getElementById('username').value;
    var self = this;

    if (self.state.message !== 'An email with a password reset link is on the way to your email inbox') {
      axios
        .post(Config.backendRootURL + '/forgotpassword', {
          username: username,
        })
        .then(function(response) {
          if (response.data === '{"reset":"failed"}') {
            self.setState({
              message: 'error sending reset request',
            });
          } else {
            self.setState({
              message: 'An email with a password reset link is on the way to your email inbox',
            });
          }
        })
        .catch(function(error) {
          Sentry.captureException(error);
          self.setState({
            message: 'there was a problem resetting your password',
          });
        });
    } else {
      self.setState({
        message: 'Seriously, go check your email',
      });
    }
  };

  handleClose = () => {
    this.setState({
      message: '',
    });
    this.props.handleClose();
  };

  render() {
    return (
      <div style={this.props.show ? {} : { display: 'none' }}>
        <div className={css(styles.background)}>
          <button className={css(styles.x)} onClick={this.handleClose}>
            X
          </button>
          <br />
          <h3 className={css(styles.title)}>Password Reset</h3>
          <br />
          <form>
            <p className={css(styles.text)}>email</p>
            <input className={css(styles.input)} type="text" id="username" />
            <br />
            <br />
            <Container>
              <Row>
                <Col
                  xs={{ size: 10, offset: 1 }}
                  sm={{ size: 8, offset: 2 }}
                  md={{ size: 6, offset: 3 }}
                  lg={{ size: 6, offset: 3 }}
                  xl={{ size: 6, offset: 3 }}
                >
                  <Button onClick={() => this.updatePassword()} buttonText="reset password" />
                </Col>
              </Row>
            </Container>
            <p className={css(styles.message)} id="message">
              {this.state.message}
            </p>
          </form>
          <br />
        </div>
      </div>
    );
  }
}

export default ForgotPasswordModal;

const styles = StyleSheet.create({
  title: {
    'margin-top': '20px',
  },

  x: {
    float: 'right',
    'margin-right': '10px',
    'margin-top': '-50px',
    background: 'none',
    color: colors.lightBlue,
    border: 'none',
    font: 'inherit',
    fontSize: '25px',
    cursor: 'pointer',
    outline: 'inherit',
  },

  text: {
    width: '20%',
    float: 'left',
    'margin-left': '15%',
  },

  message: {
    margin: '10%',
  },

  input: {
    width: '40%',
    float: 'left',
    'margin-right': '25%',
  },

  submit: {
    width: '30%',
    float: 'left',
    'margin-left': '40%',
  },

  background: {
    position: 'fixed',
    'background-color': colors.lightBlue,
    opacity: 0.95,
    'font-family': 'Patrick Hand',
    color: colors.black,
    border: '8px solid' + colors.black,
    borderTopWidth: '60px',
    boxShadow: '10px 10px 5px 1px rgba(0, 0, 255, .1)',

    '@media only screen and (max-width:767px)': {
      left: '10%',
      top: '15%',
      width: '80%',
      'border-radius': '5px',
    },

    '@media only screen and (min-width:768px) and (max-width:1024px)': {
      left: '20%',
      top: '20%',
      width: '60%',
      'border-radius': '7px',
    },

    '@media only screen and (min-width:1024px) and (max-width:1400px)': {
      left: '30%',
      top: '20%',
      width: '40%',
      'border-radius': '10px',
    },

    '@media only screen and (min-width:1401px)': {
      left: '35%',
      top: '20%',
      width: '30%',
      'border-radius': '12px',
    },

    'z-index': '99 !important',
  },
});
