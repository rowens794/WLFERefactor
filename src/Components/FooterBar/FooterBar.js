import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import colors from '../Styling/styles';

class FooterBar extends Component {
    render() {
        return (
            <div className={css(styles.FooterBar)}>
                {/* <a className={css(styles.linkText)} href="www.google.com">About the Service</a><br/> */}
                {/* <a className={css(styles.linkText)} href="www.google.com">The Blog</a><br/> */}
                {/* <a className={css(styles.linkText)} href="www.google.com">Tools to Help You Lose</a><br/> */}
                <a className={css(styles.linkText)} href="/privacy">Privacy Policy</a><br/>
            </div>
        );
    }
}

export default FooterBar;

const styles = StyleSheet.create({
    FooterBar: {
        backgroundColor: colors.black ,
        padding: '50px',
        textAlign: 'right',
        zIndex: 101,
    },
    linkText: {
        color: colors.white,
        lineHeight: '35px',
        ":hover":{
            color: colors.red,
            textDecoration: 'none'
        }
    }

});