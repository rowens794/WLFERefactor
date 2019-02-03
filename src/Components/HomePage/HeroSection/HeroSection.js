import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import colors from '../../Styling/styles';

class HeroSection extends Component {
    

    render() {

        return (
            <div className={css(styles.heroSection)}>
                <div className={css(styles.title)}>
                    <h2 className={css(styles.titleText)}>Challenge Your Friends</h2>
                    <h2 className={css(styles.titleText)}>Lose the Weight</h2>
                </div>
                <a href="/register">
                    <div className={css(styles.startButton)}>
                        <p>Start a</p>
                        <p>Competition Now!</p>
                    </div>
                </a>
                
            </div>
        );
    }
}

export default HeroSection;


const styles = StyleSheet.create({
    heroSection: {
        height: '85vh',
        backgroundImage: "url('https://res.cloudinary.com/dfebwzrhb/image/upload/v1541901672/Hero.png')",
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        position: 'relative',

        '@media only screen and (max-width:400px)': {
            height: '70vh',
        },
    },
    title: {
        marginTop: '5vh',
        'font-family': 'Patrick Hand',
        color: colors.graphicsBlue,
        transform: 'rotate(-3deg)',
    },
    titleText: {
        'font-size': '10vmin',
    },
    startButton: {
        'background-color': colors.red,
        width: '25vw',
        height: '10vw',
        transform: 'rotate(-3deg)',
        position: 'absolute',
        bottom: '3vh',
        right: '3vw',
        opacity: 0.95,
        'font-family': 'Patrick Hand',
        'line-height': '75%',
        boxShadow: '10px 10px 5px 1px rgba(0, 0, 0, .3)',
        cursor: 'pointer',
        borderRadius: '5px',
        color: colors.lightBlue,

        ':hover': {
            'background-color': colors.yellow,
        },

        '@media only screen and (max-width:480px)': {
            width: '50vw',
            height: '18vw',
            'font-size': '5vw',
            padding: '5px',
            border: '2px solid'+ colors.black,
        },

        '@media only screen and (min-width:489px) and (max-width:768px)': {
            width: '40vw',
            height: '14vw',
            'font-size': '4vw',
            padding: '7px',
            border: '4px solid'+ colors.black,
        },

        '@media only screen and (min-width:769px)': {
            width: '25vw',
            height: '9vw',
            'font-size': '2.5vw',
            padding: '10px',
            border: '6px solid'+ colors.black,
        },
    }

});