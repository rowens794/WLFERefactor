import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, LineSeries} from 'react-vis';
import { Container, Row, Col } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';

import colors from '../../../Styling/styles'

//import moment from 'moment';

class Chart extends Component {
    constructor(props) {
        super();

        this.state = {
            playerData: null,
            playerList: null,
            windowWidth: 1,
            windowHeight: 1,
        }    
    }

    componentDidMount() {
        this.setState({
            playerData: this.props.playerData,
            windowWidth: document.getElementById("chartContainer").clientWidth * .9,
            windowHeight: Math.max(document.getElementById("chartContainer").clientWidth * .5, 300),
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            playerData: nextProps.playerData
        })
    }

    render() {
        //set chartsize and watch for window resizes
        let self = this
        window.onresize = function() {
            self.setState({
                windowWidth: document.getElementById("chartContainer").clientWidth * .9,
                windowHeight: Math.max(document.getElementById("chartContainer").clientWidth * .5, 300)
            })
        }

        if (this.state.playerData){

            //convert the player weight object to an ordered array
            let object = Object.keys(this.state.playerData[0][2]) //simply grab the first player from the array
            object.sort(function(a, b){
                return new Date(a) - new Date(b)
            });
            
            //create an array of weights for each player
            var correctedPlayerData = []
            var players = []


            //determine whether players have completed initial weigh-in
            var allPlayersWeighedIn = true
            var playersNotWeighedIn = []
            for (let i = 0; i<this.state.playerData.length; i++){
                if(!this.state.playerData[i][2][object[0]]){
                    allPlayersWeighedIn = false
                    playersNotWeighedIn.push(this.state.playerData[i][0])
                }
            }
            if (allPlayersWeighedIn === false){
                var warningText = '<p>Waiting for <strong>' + playersNotWeighedIn.join(', ') + '</strong> to post initial weigh in</p>'
            }

            //if all players have atleast completed an initial weighin then generate the chart
            if (allPlayersWeighedIn) { 
                for (let i=0; i<this.state.playerData.length; i++){
                    correctedPlayerData.push([])
                    players.push(this.state.playerData[i][0]) //collects an array of the players names to produce an chart key

                    let beginningWeight = this.state.playerData[i][2][object[0]]
                    let currentWeight = beginningWeight
                    for (let j=0; j<object.length; j++){
    
                        //if statement protects against getting null values in calculation
                        if(this.state.playerData[i][2][object[j]]){
                            currentWeight = this.state.playerData[i][2][object[j]]
                        }
    
                        //if date is past current date then convert reading to NaN
                        var today = new Date()
                        var competitionDay = new Date(object[j])
    
    
                        if(competitionDay >= today){ //if the competition day is greater than todays date  then produce a null value so that it won't display on chart
                            correctedPlayerData[i].push({x: competitionDay, y: null, name: players})
                        }else{  //otherwise push weight change
                            let percentageChange = (currentWeight - beginningWeight) / beginningWeight
                            correctedPlayerData[i].push({x: competitionDay, y: percentageChange * 100, name: players})
                        }
                    }
                }
            }
        }

        
        //js to get styling options for the axis on the chart
        //react-vis couldn't seem to handle media queries
        let yAxisStyles = {}
        let xAxisStyles = {}
        let yAxisTitle = '' 
        var viewportWidth = window.innerWidth

        switch(true) {
            case viewportWidth <= 576:
                yAxisStyles = {fontSize: '12px', textAlign: 'left'}
                xAxisStyles = {fontSize: '12px', marginBottom: '0px'}
                yAxisTitle = '% Chg' 
                break;
            case viewportWidth <= 767:
                yAxisStyles = {fontSize: '14px', textAlign: 'left'}
                xAxisStyles = {fontSize: '12px', marginBottom: '0px'}
                yAxisTitle = '% Chg' 
                break;
            case viewportWidth <= 991:
                yAxisStyles = {fontSize: '16px', textAlign: 'left'}
                xAxisStyles = {fontSize: '12px', marginBottom: '0px'}
                yAxisTitle = '% Weight Change' 
                break;
            default:
                yAxisStyles = {fontSize: '16px', textAlign: 'left'}
                xAxisStyles = {fontSize: '12px', marginBottom: '0px'}
                yAxisTitle = 'Percentage Weight Change' 
        }

        return (
            <div id='chartContainer' className={css(styles.container)}>
                { //Check if message failed
                    
                    (this.state.playerData && allPlayersWeighedIn)
                    ?   <Container fluid style={{ padding: 0, marginTop: 0}}>

                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col sm={{ size: 12, offset: 0 }}>
                                    <h3 className={css(styles.heading)}>% Weight Change</h3>
                                </Col>
                            </Row>

                            <Row style={{ padding: 0, margin: 0 }}>
                                <Col sm={{ size: 12, offset: 0 }}>

                                    
                                    <XYPlot 
                                        xType="time" 
                                        width={this.state.windowWidth}
                                        height={this.state.windowHeight}
                                        onMouseLeave={() => this.setState({
                                            hoveredNodeX: null,
                                            hoveredNodeY: null,
                                            hoveredPlayer: null
                                        })}
                                        margin={{bottom: 100}}
                                        >
                                    
                                        <VerticalGridLines />
                                        <XAxis tickLabelAngle={-70} style={xAxisStyles} />
                                        <YAxis title={yAxisTitle} style={yAxisStyles}/>
                                        
                                        
                                        {correctedPlayerData.map((player, i) => {
                                            return <LineSeries key={i} 
                                                    getNull={(d) => d.y !== null}  
                                                    data={player} 
                                                    curve={'curveMonotoneX'} 
                                                    color={colors.chartColors[i%colors.chartColors.length]} //set the color of the line based off of the array of chart colors defined in the style file
                                            />
                                        })}

                                    </XYPlot>

                                </Col>
                            </Row>

                            <Row>
                                {players.map((player, i) => {
                                    return <Col sm={{ size: 2, offset: 0 }} key={player+i}>
                                        <p style={{'color': colors.chartColors[i]}}>-----{player}</p>
                                    </Col>
                                })}
                            </Row>

                        </ Container>

                        : <div> 
                            <p dangerouslySetInnerHTML={{__html: warningText}} />
                        </div> 
                }
            </div>
        );
    }
}

export default Chart;


const styles = StyleSheet.create({
    container: {
        'text-align': 'center',
        margin: 'auto'
    },
    heading: {
        marginTop: '20px',
        marginBottom: '20px',
        'text-align': 'left',
    },
});
