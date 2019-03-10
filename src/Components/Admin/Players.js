import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class Players extends Component {
  render() {
    let players = this.props.players;
    console.log(players[38]);
    return (
      <div className={css(styles.body)}>
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <td className={css(styles.elementH)}>#</td>
              <td className={css(styles.elementNameH)}>Name</td>
              <td className={css(styles.elementH)}>Email</td>
              <td className={css(styles.elementH)}>Sign Up Date</td>
              <td className={css(styles.elementH)}>Last Sign In</td>
              <td className={css(styles.elementH)}>Number of Comps</td>
              <td className={css(styles.elementH)}>Player Verified</td>
              <td className={css(styles.elementH)}>Emails Enabled</td>
            </tr>
          </thead>
          <tbody>
            {players.map(function(player, i) {
              let verified = null;
              let emailsEnabled = null;
              if (player.verified) verified = 'x';
              if (player.emailsEnabled) emailsEnabled = 'x';
              return (
                <tr key={player.id}>
                  <td className={css(styles.element)}>{i + 1}</td>
                  <td className={css(styles.elementName)}>{player.name || 'n/a'}</td>
                  <td className={css(styles.element)}>{player.email}</td>
                  <td className={css(styles.element)}>{player.signUpDate || 'n/a'}</td>
                  <td className={css(styles.element)}>{player.lastSignIn || 'n/a'}</td>
                  <td className={css(styles.element)}>{player.numberOfCompetitions || 0}</td>
                  <td className={css(styles.element)}>{verified}</td>
                  <td className={css(styles.element)}>{emailsEnabled}</td>
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
});
