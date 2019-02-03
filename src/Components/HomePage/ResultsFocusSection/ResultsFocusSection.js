import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Container, Row, Col } from 'reactstrap';
import colors from '../../Styling/styles';

class ResultsFocusSection extends Component {
    render() {
        return (
            <div className={css(styles.resultsFocusSection)}>
                <Container>
                    <Row>
                        <Col md={{ size: 6, offset: 0 }} lg={{ size: 5, offset: 1 }}>
                            <h3 className={css(styles.title)}>Focus on Results</h3>
                            <p className={css(styles.text)}>There are so many tools out there that focus on the means to making meaningful lifestyle changes to achieve your weightloss goals - and don’t get us wrong - these tools are super important.  But we are only focused on documenting your (and your friends) results.</p><br />
                            <p className={css(styles.text)}>We are strong believers that setting up a competition will provide the motivation for you find the right tools and methods to make the change occur.</p>
                        </Col>

                        <Col className={css(styles.picBox)} md={{ size: 6, offset: 0 }} lg={{ size: 5, offset: 1 }}>
                            <img className={`d-none d-md-block ${css(styles.image)}`} src='https://res.cloudinary.com/dfebwzrhb/image/upload/v1542037427/Focus_on_Results.png' alt='Focus on Results'/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ResultsFocusSection;

const styles = StyleSheet.create({
    resultsFocusSection: {

        '@media only screen and (max-width:480px)': {
            padding: '5vh',
        },

        '@media only screen and (min-width:481px) and (max-width:768px)': {
            padding: '12vh',

        },

        '@media only screen and (min-width:769px)': {
            padding: '12vh',
        },

        backgroundColor: colors.white ,
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