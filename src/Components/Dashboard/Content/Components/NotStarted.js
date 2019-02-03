import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class NotStarted extends Component {
    render() {
        return (
            <div className={css(styles.text)}>
                The competition has not yet begun.  Be sure to sign back in on or as close to {this.props.startDate} as possible to log your starting weight.
            </div>
        );
    }
}

export default NotStarted;

const styles = StyleSheet.create({
    text: {
        marginTop: '50px',
        marginBottom: '50px',
        'text-align': 'center',
        fontSize: '22px'
    },
});