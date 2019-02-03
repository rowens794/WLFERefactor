import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container, Row, Col } from 'reactstrap';
import colors from '../../Styling/styles';

class Gamification extends Component {
    render() {
        return (
            <div className={css(styles.gamificationSection)}>
                <Container>
                    <Row>
                        <Col md={{ size: 6, offset: 0 }} lg={{ size: 5, offset: 1 }}>
                            <h3 className={css(styles.title)}>Gamification + Support = Results</h3>
                            <p className={css(styles.text)}>Losing weight is fundamentally hard.  That’s why the majority of Americans are now overweight.</p><br />
                            <p className={css(styles.text)}>We believe that by creating a friendly competition among friends - you and the people that you care about can succeed at your weight loss goals.</p>
                        </Col>

                        <Col className={css(styles.picBox)} md={{ size: 6, offset: 0 }} lg={{ size: 5, offset: 1 }}>
                            <img className={`d-none d-md-block ${css(styles.image)}`} src='https://res.cloudinary.com/dfebwzrhb/image/upload/v1541971779/GamifyWeightLoss.png' alt='Gamification of Weightloss'/>
                        </Col>

                    </Row>
                </Container>
            </div>
        );
    }
}

export default Gamification;

const styles = StyleSheet.create({
    gamificationSection: {

        '@media only screen and (max-width:480px)': {
            padding: '5vh',
        },

        '@media only screen and (min-width:481px) and (max-width:768px)': {
            padding: '12vh',

        },

        '@media only screen and (min-width:769px)': {
            padding: '12vh',
        },

        backgroundColor: colors.extraLightBlue ,
        opacity: '50%',
        padding: '10vh',
        'background-size': 'cover',

    },
    
    title: {
        'font-family': 'Patrick Hand',
        fontSize: '32px',
        color: colors.graphicsBlue,
        textAlign: 'left',
        textDecoration: 'underline',
    },

    text: {
        'font-family': 'Patrick Hand',
        fontSize: '22px',
        textAlign: 'left',
        color: colors.graphicsBlue,
    },

    image: {
        height: '40vh',
        textAlign: 'center',
    },

    picBox: {

    }

});