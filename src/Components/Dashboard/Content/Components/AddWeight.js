import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';

import colors from '../../../Styling/styles';
import Button from '../../../Elements/Button';


class PlayerList extends Component {

    constructor(props) {
        super();

        this.state = {
            competitionID: '',
            date: moment(new Date()).format('M/D/YYYY'),
            token: localStorage.getItem('userToken'),
            userWeight: null,
        }    
    }

    componentDidMount() {
        this.setState({
            competitionID: this.props.competitionData._id,
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            competitionID: newProps.competitionData._id,
        })
    }

    submitWeight(props){
        let newWeight = parseFloat(document.getElementById("userWeight").value)
        if (newWeight > 0){
            let formattedDate = moment(new Date()).format("M/D/YYYY")
            let dateWeightObj = {[formattedDate]: newWeight}
            props.compUpdate(this.state.competitionID, dateWeightObj)
            document.getElementById("userWeight").value = ''
        }

    }

    render() {

        return (
            
            <Container fluid style={{ padding: 0, marginTop: 0 }} className={css(styles.box)}>
                <Row style={{ padding: 0, margin: 0 }}>
                    <Col sm={{ size: 12, offset: 0 }}>
                        <p className={css(styles.text)}>Enter or update your weight for today:</p>
                    </Col>
                </Row>

                <Row style={{ padding: 0, margin: 0 }}>
                    <Col sm={{ size: 12, offset: 0 }}>
                        <input id='userWeight' className={css(styles.input)}></input>
                    </Col>
                </Row>

                <Row style={{ padding: 0, margin: 0 }}>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Button buttonText='Submit' onClick={() => this.submitWeight(this.props)}/>
                    </Col>
                </Row>
            </ Container>
        );
    }
}


export default PlayerList;

const styles = StyleSheet.create({

    text: {
        'text-align': 'center',
    },
    button: {
        'width': '150px',
        margin: 'auto',
        cursor: 'pointer', 
        'background-color': colors.black,
        color: colors.white,
        paddingTop: '10px',
        marginTop: '15px',
        border: '1px solid'+ colors.black,
        'border-radius': '3px',
    },
    input:{
        height: '35px',
        width: '90%',
        fontSize: '.9em',
        textAlign: 'center',
        border: '1px solid ' + colors.black,
        borderRadius: '10px',
    },
});