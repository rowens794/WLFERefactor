import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class Competitions extends Component {
  render() {
    let competitions = this.props.competitions;
    return (
      <div className={css(styles.body)}>
        <h2>All Competitions</h2>
        <table>
          <thead>
            <tr>
              <td className={css(styles.elementH)}>#</td>
              <td className={css(styles.elementNameHC)}>Name</td>
              <td className={css(styles.elementH)}>Creation Date</td>
              <td className={css(styles.elementH)}>Start Date</td>
              <td className={css(styles.elementH)}>Last Activity</td>
              <td className={css(styles.elementH)}>Entry Fee</td>
              <td className={css(styles.elementH)}>Length</td>
              <td className={css(styles.elementH)}>Payout</td>
              <td className={css(styles.elementH)}>Interim Prizes</td>
              <td className={css(styles.elementH)}>Number of Players</td>
              <td className={css(styles.elementH)}>Invites Sent</td>
            </tr>
          </thead>
          <tbody>
            {competitions.map(function(competition, i) {
              let numOfPlayers = null;
              let numOfInvites = null;
              if (competition.players) numOfPlayers = competition.players.length;
              if (competition.invites) numOfInvites = competition.invites.length;
              console.log(competition);

              return (
                <tr key={competition.id}>
                  <td className={css(styles.element)}>{i + 1}</td>
                  <td className={css(styles.elementNameC)}>{competition.name}</td>
                  <td className={css(styles.element)}>{competition.creationDate}</td>
                  <td className={css(styles.element)}>{competition.startDate}</td>
                  <td className={css(styles.element)}>{competition.lastActivity}</td>
                  <td className={css(styles.element)}>{competition.entryFee}</td>
                  <td className={css(styles.element)}>{competition.length}</td>
                  <td className={css(styles.element)}>{competition.payout}</td>
                  <td className={css(styles.element)}>{competition.interimPrize || 0}</td>
                  <td className={css(styles.element)}>{numOfPlayers}</td>
                  <td className={css(styles.element)}>{numOfInvites}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    margin: 'auto',
    marginBottom: '100px',
  },
  element: {
    width: '100px',
  },
  elementName: {
    width: '150px',
  },
  elementH: {
    width: '100px',
    fontWeight: 'bold',
  },
  elementNameH: {
    width: '150px',
    fontWeight: 'bold',
  },
  elementNameHC: {
    width: '350px',
    fontWeight: 'bold',
  },
  elementNameC: {
    width: '350px',
  },
});
