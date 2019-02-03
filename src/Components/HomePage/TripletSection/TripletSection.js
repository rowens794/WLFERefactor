import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container, Row, Col } from 'reactstrap';
import colors from '../../Styling/styles';

class TripletSection extends Component {
    render() {
        return (
            <div className={css(styles.TripletSection)}>
                <Container>
                    <Row>
                        <Col md={{ size: 10, offset: 1 }}>
                            <Row>
                                <Col md={{ size: 4, offset: 0 }}>
                                    <h3 className={css(styles.title)}>Peer Motivation</h3>
                                    <img className={`d-none d-md-block ${css(styles.image)}`} src='https://res.cloudinary.com/dfebwzrhb/image/upload/v1542038093/Motivation.png' alt='Focus on Results'/>
                                    <p className={css(styles.text)}>Surrounding yourself with your peers AND making your progress explicity available to people that you care about supplies positive peer pressure that forces you to make progress or face your peer group with failure. </p>
                                </Col>

                                <Col md={{ size: 4, offset: 0}}>
                                    <h3 className={css(styles.title)}>Consistent Tracking</h3>
                                    <img className={`d-none d-md-block ${css(styles.image)}`} src='https://res.cloudinary.com/dfebwzrhb/image/upload/v1542038093/Calendar.png' alt='Focus on Results'/>
                                    <p className={css(styles.text)}>Commiting to tracking data about your actions and your progress forces you to face the reality of whether or not the steps you are taking to reach your goals are effective.</p>
                                </Col>

                                <Col md={{ size: 4, offset: 0}}>
                                    <h3 className={css(styles.title)}>External Motivation</h3>
                                    <img className={`d-none d-md-block ${css(styles.image)}`} src='https://res.cloudinary.com/dfebwzrhb/image/upload/v1542038093/cash.png' alt='Focus on Results'/>
                                    <p className={css(styles.text)}>Our platform provides the capability for you and your friends to take the competition a step further and commit actual cash to the competition.  Putting cash up for grabs keeps everyone engaged.</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default TripletSection;

const styles = StyleSheet.create({
    TripletSection: {

        '@media only screen and (max-width:480px)': {
            padding: '5vh',
        },

        '@media only screen and (min-width:481px) and (max-width:768px)': {
            padding: '12vh',

        },

        '@media only screen and (min-width:769px)': {
            padding: '12vh',
        },

        backgroundColor: colors.lightYellow ,
        opacity: '50%',
        padding: '10vh',
        'background-size': 'cover',

    },
    
    title: {
        'font-family': 'Patrick Hand',
        fontSize: '24px',
        color: colors.graphicsBlue,
        textAlign: 'center',
        textDecoration: 'underline',
    },

    text: {
        'font-family': 'Patrick Hand',
        fontSize: '16px',
        textAlign: 'justify',
        color: colors.graphicsBlue,
        padding: '20px'
    },

    image: {
        height: '20vh',
        margin: 'auto'
    },
    
    columns: {
        margin: '50px'
    }

});