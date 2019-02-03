import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import colors from '../Styling/styles';

class RegistrationRecieved extends Component {
    render() {
        return (
            <div className={css(styles.RegisterSection)}>
                <div>
                    <div className={css(styles.imageContainer)}>
                        <img className={css(styles.image)} src='https://res.cloudinary.com/dfebwzrhb/image/upload/v1542039803/OnYourWay.png' alt='Focus on Results'/>
                    </div>
                </div>

                <p className={css(styles.title)}>You're Almost There</p>
                <p className={css(styles.text)}>We've recieved your registration. Now head over to your email client and confirm your email address to complete the sign-up process.</p>

            </div>
            
        );
    }
}

export default RegistrationRecieved;

const styles = StyleSheet.create({
    RegistrationRecievedSection: {
        paddingTop: '5vh',

        '@media only screen and (max-width:480px)': {
            backgroundColor: colors.white ,
            margin: 'auto',
            paddingBottom: '10vh',
            'background-size': 'cover',

        },

        '@media only screen and (min-width:481px) and (max-width:768px)': {
            backgroundColor: colors.white ,
            margin: 'auto',
            padding: '5vh',
            paddingBottom: '10vh',
            'background-size': 'cover',
        },

        '@media only screen and (min-width:769px)': {
            backgroundColor: colors.white ,
            margin: 'auto',
            padding: '5vh',
            paddingBottom: '10vh',
            'background-size': 'cover',
        },
    },
    
    title: {
        'font-family': 'Patrick Hand',
        fontSize: '32px',
        color: colors.black,
        textAlign: 'center',
        textDecoration: 'none',
        paddingBottom: '25px'
    },

    text: {
        color: colors.black,
        'font-family': 'Patrick Hand',
        fontSize: '22px',
        padding: '10px',
        margin: '0vh 20vw 5vh 20vw',
    },

    image: {
        height: '40vh',
        textAlign: 'center',
        margin: 'auto',
        paddingTop: '5vh',
    },

    imageContainer: {
        paddingBottom: '50px',
    },

});