import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import { MyContext } from '../ContextProvider/ContextProvider';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';
import Config from '../Config/config';

class Dashboard extends Component {
  constructor(props) {
    super();

    this.getCompData = this.getCompData.bind(this);
    this.updateCompData = this.updateCompData.bind(this);

    this.state = {
      userName: '',
      email: null,
      errorMsg: null,
      competitions: [],
      activeCompetition: null,
      competitionAdmin: null,
      compData: null,
      lastActiveCompetition: null,
    };
  }

  async getCompData(id, compAdmin) {
    let self = this;

    //test if competition is loaded in state
    if (this.state.activeCompetition) {
      //if it's loaded then make sure that the same competition isn't re-retrieved from the API
      if (this.state.activeCompetition._id !== id) {
        await axios
          .post(Config.backendRootURL + '/compData', {
            token: localStorage.getItem('userToken'), //fetch the JWT from local storage
            competitionId: id,
          })
          .then(function(response) {
            if (response.data.status === 'failed') {
              self.setState({
                // this should only be hit if user messes with token
                errorMsg: 'Something went very wrong.  Signout and signback in.',
              });
            } else {
              self.setState({
                activeCompetition: response.data,
                competitionAdmin: compAdmin,
                compData: response.data,
              });
            }
          })
          .catch(function(error) {
            Sentry.captureException(error);
          });
      }
    } else {
      //if competition doesn't exist in state then go ahead and grab from the api
      await axios
        .post(Config.backendRootURL + '/compData', {
          token: localStorage.getItem('userToken'), //fetch the JWT from local storage
          competitionId: id,
        })
        .then(function(response) {
          if (response.data.status === 'failed') {
            self.setState({
              // this should only be hit if user messes with token
              errorMsg: 'Something went very wrong.  Signout and signback in.',
            });
          } else {
            self.setState({
              activeCompetition: response.data,
              competitionAdmin: compAdmin,
              compData: response.data,
            });
          }
        })
        .catch(function(error) {
          Sentry.captureException(error);
        });
    }
  }

  async updateCompData(id, updateFields) {
    let self = this;
    await axios
      .post(Config.backendRootURL + '/updateCompData', {
        token: localStorage.getItem('userToken'), //fetch the JWT from local storage
        competitionId: id,
        updateFields: updateFields,
      })
      .then(function(response) {
        if (response.data.status === 'failed') {
          self.setState({
            // this should only be hit if user messes with token
            errorMsg: 'Something went very wrong.  Signout and signback in.',
          });
        } else {
          self.setState({
            activeCompetition: response.data,
          });
        }
      })
      .catch(function(error) {
        Sentry.captureException(error);
      });
  }

  render() {
    var acctVerified = null;
    if (localStorage.getItem('accountVerified') === 'true') {
      acctVerified = true;
    } else if (localStorage.getItem('accountVerified') === 'false') {
      acctVerified = false;
    }

    return (
      <MyContext.Consumer>
        {(context) =>
          context.state.loggedIn && acctVerified ? (
            <Container fluid style={{ padding: 0, margin: 0 }}>
              <Row style={{ padding: 0, margin: 0 }}>
                <Col
                  style={{ padding: 0, margin: 0, marginBottom: -0 }}
                  xs={{ size: 0, offset: 0 }}
                  sm={{ size: 4, offset: 0 }}
                  md={{ size: 3, offset: 0 }}
                  lg={{ size: 2, offset: 0 }}
                >
                  <Sidebar userInfo={this.state} getCompData={this.getCompData} />
                </Col>

                <Col
                  style={{ padding: 0, margin: 0, marginBottom: -0 }}
                  xs={{ size: 12, offset: 0 }}
                  sm={{ size: 8, offset: 0 }}
                  md={{ size: 9, offset: 0 }}
                  lg={{ size: 10, offset: 0 }}
                >
                  <Content
                    competitionInfo={this.state.activeCompetition}
                    compUpdate={this.updateCompData}
                    competitionAdmin={this.state.competitionAdmin}
                    competitions={this.state.competitions}
                    compData={this.state.compData}
                    getCompData={this.getCompData}
                    userName={this.state.userName}
                    email={this.state.email}
                  />
                </Col>
              </Row>
            </Container>
          ) : acctVerified === null ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/registrationrecieved" />
          )
        }
      </MyContext.Consumer>
    );
  }

  async componentDidMount() {
    const self = this; //'this' loses context in axios function ... set to var 'self'

    axios
      .post(Config.backendRootURL + '/userData', {
        token: localStorage.getItem('userToken'), //fetch the JWT from local storage
      })
      .then(function(response) {
        if (response.data.status === 'failed') {
          self.setState({
            // this should only be hit if user messes with token
            errorMsg: 'Something went very wrong.  Signout and signback in.',
          });
        } else {
          self.setState({
            userName: response.data.name,
            email: response.data.email,
            competitions: response.data.competitions,
            lastActiveCompetition: response.data.lastActiveCompetition,
          });

          //check if last active competition datapoint exists in user

          var competitionToRetrieve = null;
          if (response.data.lastActiveCompetition) {
            competitionToRetrieve = response.data.lastActiveCompetition;
          } else {
            competitionToRetrieve = response.data.competitions[0].id;
          }

          //set the active competition
          self.getCompData(competitionToRetrieve);
        }
      })
      .catch(function(error) {
        self.setState({
          // this should only be hit if there is a server error
          errorMsg: 'Something went very wrong.  Signout and signback in.',
        });
        Sentry.captureException(error);
      });

    axios
      .post(Config.backendRootURL + '/userCompData', {
        token: localStorage.getItem('userToken'), //fetch the JWT from local storage
      })
      .then(function(response) {
        if (response.data.status === 'failed') {
          self.setState({
            // this should only be hit if user messes with token
            errorMsg: 'Something went very wrong.  Signout and signback in.',
          });
        } else {
          self.setState({
            userName: response.data.name,
          });
        }
      })
      .catch(function(error) {
        self.setState({
          // this should only be hit if there is a server error
          errorMsg: 'Something went very wrong.  Signout and signback in.',
        });
        Sentry.captureException(error);
      });
  }
}

export default Dashboard;
