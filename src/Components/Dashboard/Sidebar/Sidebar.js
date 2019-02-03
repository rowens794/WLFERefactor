import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import colors from '../../Styling/styles';
import Button from '../../Elements/Button';

class Sidebar extends Component {

    render() {
        const primaryDivClasses = `d-none d-sm-block d-md-block d-lg-block d-xl-block ${css(styles.background)}`
        console.log(this.props.userInfo)
        return (
            <div className={ primaryDivClasses }>
                <div className={css(styles.hello)}>
                    <p>Hello</p>
                    <p>{this.props.userInfo.userName}</p>
                    <hr className={css(styles.horRow)}/>
                    <br />
                    <p>Competitions</p>
                    {
                        (this.props.userInfo.competitions.length === 0)
                        ? <p> no current competitions </p> 
                        : this.props.userInfo.competitions.map((comp) => {
                            return <div className={css(styles.compLink)} key={comp.id} onClick={() => this.props.compData(comp.id, comp.admin)}> {comp.name} </div> 
                        }) 
                    }
                    <Button href='/createComp' buttonText='New Competition' />
                    <br /><br /><br />
                    <a className={css(styles.compByID)} href='/addcompbyid'>Add a Competition By ID</a>
                    
                </div>
            </div>
        );
    }
}

export default Sidebar;

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.grey,
        position: 'relative',
        top: 0,
        left: 0,
        overflowX: 'hidden',
        paddingTop: '30px',
        height: '100%',
    },

    horRow: {
        margin: '10px',
        backgroundColor: colors.black,
    },

    newCompButton: {
        'width': '80%',
        float: 'left',
        'margin-left': '10%', 
        cursor: 'pointer', 
        'background-color': colors.graphicsBlue,
        border: '1px solid'+ colors.black,
        'border-radius': '3px',
        marginTop: '25px',
        marginBottom: '10px',
        paddingTop: '10px',
    },
    buttonText: {
        'vertical-align': 'middle',
        color: colors.white,
        fontWeight: 'bold',
    },
    compLink: {
        cursor: 'pointer', 
        color: colors.graphicsBlue,
        ':hover': {
            color: colors.red
        }
    },
    compByID: {
        fontSize: '12px',
        color: colors.black,
    }

});