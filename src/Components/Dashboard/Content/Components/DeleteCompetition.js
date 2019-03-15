import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import colors from '../../../Styling/styles';

export default class DeleteCompetition extends Component {
  constructor(props) {
    super();

    this.state = {
      confirmDelete: false,
    };
  }

  clickDelete = () => {
    this.setState({
      confirmDelete: !this.state.confirmDelete,
    });
  };

  confirmDelete = () => {
    this.props.deleteCompetition();
  };

  cancelDelete = () => {
    this.setState({
      confirmDelete: !this.state.confirmDelete,
    });
  };

  render() {
    return (
      <div>
        {!this.state.confirmDelete ? (
          <p className={css(styles.pwraper)}>
            <span className={css(styles.deleteComp)} onClick={() => this.clickDelete()}>
              Delete Competition
            </span>
          </p>
        ) : (
          <p className={css(styles.pwraper)}>
            {' '}
            All competition data will be deleted. Confirm delete :
            <span className={css(styles.deleteComp)} onClick={() => this.confirmDelete()}>
              Delete
            </span>
            <span className={css(styles.cancelDelete)} onClick={() => this.cancelDelete()}>
              Cancel
            </span>
          </p>
        )}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  pwraper: {
    marginTop: '-10px',
    paddingLeft: '60px',
    paddingBottom: '50px',
    fontStyle: 'italic',
    textAlign: 'left',
    fontSize: '1em',
    color: colors.white,
  },
  deleteComp: {
    color: colors.red,
    padding: '0px 0px 0px 10px',
    ':hover': {
      color: colors.yellow,
      cursor: 'pointer',
    },
  },
  cancelDelete: {
    padding: '0px 10px 0px 10px',
    color: colors.green,
    ':hover': {
      color: colors.yellow,
      cursor: 'pointer',
    },
  },
});
