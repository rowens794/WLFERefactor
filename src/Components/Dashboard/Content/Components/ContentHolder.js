import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class ContentHolder extends Component {
    render() {
        return (
            <div className={css(styles.box)}>
                {this.props.children}
            </div>
        );
    }
}

export default ContentHolder;

const styles = StyleSheet.create({
    box: {
        'text-align': 'center',
        padding: '20px',
        'box-shadow': '5px 5px 10px grey',
        'border-radius': '25px',
        backgroundColor: '#FFFFFF'
    },
});