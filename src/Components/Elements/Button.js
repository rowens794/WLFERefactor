import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import colors from '../Styling/styles';

class Button extends Component {
    render() {
        return (
            <a className={css(styles.newCompButton)} href={this.props.href} onClick={this.props.onClick}>
                <p className={css(styles.buttonText)}>{this.props.buttonText}</p>
            </a>
        );
    }
}

const styles = StyleSheet.create({
    newCompButton: {
        'width': '80%',
        float: 'left',
        'margin-left': '10%', 
        cursor: 'pointer', 
        'background-color': colors.graphicsBlue,
        border: '1px solid'+ colors.black,
        'border-radius': '3px',
        marginTop: '20px',
    },
    buttonText: {
        'vertical-align': 'middle',
        color: colors.white,
        fontWeight: 'bold',
        padding: '5px',
        margin: '5px'
    },
})

export default Button;