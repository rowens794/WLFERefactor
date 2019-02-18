import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import * as Sentry from '@sentry/browser';

import Rules from '../Dashboard/Content/Components/Rules';
import Config from '../Config/config';

import colors from '../Styling/styles';

class RegisterFromInvite extends Component {
  constructor(props) {
    super();

    this.handleSubmit.bind(this);

    this.state = {
      errorMsg: '',
      competitionID: '',
      competition: null,
      password: 'y',
      confirm: 'x',
    };
  }

  componentDidMount() {
    var self = this;
    console.log('mount');
    axios
      .post(Config.backendRootURL + '/limitedCompData', {
        competitionId: this.props.match.params.id,
      })
      .then((response) => {
        var compID = response.data;
        if (response.data === null) {
          console.log('error');
          self.setState({
            // this should only be hit if user messes with token
            errorMsg: 'Something went very wrong.  Signout and signback in.',
          });
        } else {
          //check to see if user is already signed in
          let userToken = localStorage.getItem('userToken');

          if (userToken) {
            //send user to db for addition to competition and userobject
            axios
              .post(Config.backendRootURL + '/addUserToCompFromEmail', {
                competitionId: compID,
                token: userToken,
              })
              .then(function(response) {
                console.log(response);
              })
              .catch(function(error) {
                Sentry.captureException(error);
              });

            //redirect user to their dashboard
            window.location.href = '/dashboard';
          } else {
            console.log('user does not exist');
            self.setState({
              competition: response.data,
            });
          }
        }
      });
  }

  handleSubmit = function(event) {
    var self = this;
    event.preventDefault();

    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    self.setState({
      password: password,
      confirm: confirmPassword,
    });

    if (password === confirmPassword) {
      axios
        .post(Config.backendRootURL + '/registerfrominvite/' + self.props.match.params.id, {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          comp_id: document.getElementById('comp_id').value,
        })
        .then(function(response) {
          if (response.data.message !== 'success') {
            self.setState({
              errorMsg: response.data.message,
            });
          } else {
            window.location.href = '/registrationrecieved';
          }
        })
        .catch(function(error) {
          self.setState({
            errorMsg: 'there was a problem with your login',
          });
        });
    } else {
      self.setState({
        errorMsg: 'the passwords do not match',
      });
    }
  };

  render() {
    return (
      <div className={css(styles.RegisterSection)}>
        {this.state.competition ? (
          <div>
            <div>
              <div className={css(styles.imageContainer)}>
                <img
                  className={css(styles.image)}
                  src="https://res.cloudinary.com/dfebwzrhb/image/upload/v1542039803/OnYourWay.png"
                  alt="Focus on Results"
                />
              </div>
            </div>

            <p className={css(styles.title)}>Join the {this.state.competition.CompetitionName}</p>

            <p className={css(styles.error)}>{this.state.errorMsg}</p>

            <form className="formBody" onSubmit={(event) => this.handleSubmit(event)}>
              <p className={css(styles.text)}>Name</p>
              <input className={css(styles.input)} type="text" id="name" />
              <br />
              <br />
              <p className={css(styles.text)}>Email</p>
              <input className={css(styles.input)} type="text" id="email" />
              <br />
              <br />
              <p className={css(styles.text)}>Password</p>
              <input className={css(styles.input)} type="password" id="password" />
              <br />
              <br />
              <p className={css(styles.text)}>Confirm Password</p>
              <input className={css(styles.input)} type="password" id="confirmPassword" />
              <br />
              <br />
              <input type="hidden" value={this.props.match.params.id} id="comp_id" />
              <input className={css(styles.submit)} type="submit" value="Submit" />
            </form>

            <br />
            <br />
            <br />
            <br />
            <br />
            <Container fluid style={{ padding: 0, margin: 0 }}>
              <Row style={{ padding: 0, margin: 0 }}>
                <Col sm={{ size: 12, offset: 0 }} md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 3 }}>
                  <Rules competitionData={this.state.competition} />
                </Col>
              </Row>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}

export default RegisterFromInvite;

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
    textAlign: 'center',
    margin: 'auto',
  },

  imageContainer: {
    paddingBottom: '50px',
  },

  formBody: {
    margin: '40px',
    paddingBottom: '50px',
  },
  error: {
    'font-family': 'Patrick Hand',
    fontSize: '16px',
    color: colors.red,
  },
});
