import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import colors from '../Styling/styles';
import Button from '../Elements/Button';
import Config from '../Config/config';

import Players from './Players';
import Competitions from './Competitions';

export default class Admin extends Component {
  constructor(props) {
    super();
    this.isEmptyObj = this.isEmptyObj.bind(this);

    this.state = {
      ident: null,
      users: null,
      competitions: null,
      clicks: null,
    };
  }

  isEmptyObj = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  login = (val) => {
    var self = this;
    //let val = document.getElementById('entrykey').value;
    axios
      .post(Config.backendRootURL + '/admin', {
        key: val,
      })
      .then(function(response) {
        if (response.data.login === 'failed') {
        } else if (self.isEmptyObj(response.data.comps)) {
        } else if (self.isEmptyObj(response.data.users)) {
        } else {
          localStorage.setItem('AdminEntryToken', response.data.ident);
          self.setState({
            ident: response.data.ident,
            users: response.data.users,
            competitions: response.data.comps,
            clicks: response.data.clicks,
          });
        }
      });
  };

  componentWillMount() {
    let key = localStorage.getItem('AdminEntryToken');
    if (key) {
      this.login(key);
    }
  }

  render() {
    return (
      <div className={css(styles.body)}>
        {!this.state.ident && (
          <Container>
            <Row>
              <Col>
                <input className={css(styles.input)} type="text" id="entrykey" />
                <Button onClick={() => this.login(document.getElementById('entrykey').value)} buttonText="Access" />
              </Col>
            </Row>
          </Container>
        )}

        {this.state.competitions && (
          <div>
            <Competitions competitions={this.state.competitions} />
            <Players players={this.state.users} />
          </div>
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    minHeight: '1000px',
    margin: '50px',
  },
  input: {
    width: '30%',
    float: 'center',
  },
});
