import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';

import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';

function randomProperty(obj) {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}

const posts = {
  post1: {
    title: 'Your Body is a Calorie Burning Sports Car',
    text:
      "Or maybe just a moped... When I was in high school a friend of mine, Dan, locked his keys in this car... with the ignition running. It took all day for his parents to get his spare set of keys to him. We were shocked when he finally unlocked the doors and only a quarter of a tank of fuel had burned. Years later, when maintaining my weight was no longer as easy as it was in high school, I would think about that car and how it was a good analogy for what was going on in my body. Today, with a stressful desk job and two toddlers to take care of, my mind goes a million miles an hour, but it seems my body is idling in a parking lot. I think you see where I'm going with this.",
    imgLong: 'https://res.cloudinary.com/dfebwzrhb/image/upload/v1554143426/Car_Long.png',
    imgShort: 'https://res.cloudinary.com/dfebwzrhb/image/upload/v1554143426/Car_Short.png',
    altText: 'sports car',
    link: '/blog/your-body-is-a-sports-car/',
  },
  post2: {
    title: 'Super Charging Your Weight Loss Goals',
    text:
      'Diet is written written in stone - you must keep it under control to lose weight. But the unsung hero of true change is a compelling fitness routine. A good fitness routine should provide for two separate goals: A cardio component that increases your total daily enery expenditure and allows you to super charge your weightloss, A muscle building element that adds muscle over time and increases the rate at which your body naturally burns calories. Every workout that you do will burn additional calories over what your body burns naturally. An average person will burn around 300 calories over the course of a 30 minute jog. Given that there are 3,500 calories in a pound,',
    imgLong: 'https://res.cloudinary.com/dfebwzrhb/image/upload/v1554145009/battery_long.png',
    imgShort: 'https://res.cloudinary.com/dfebwzrhb/image/upload/v1554145009/battery_short.png',
    altText: 'super charged battery',
    link: '/blog/super-charging-your-fitness-goals/',
  },
};

var post = randomProperty(posts);

export default class PostHighlighter extends Component {
  render() {
    return (
      <Container className={css(styles.container)}>
        <Card className="d-none d-lg-block" style={{ border: 'none' }}>
          <CardImg top src={post.imgLong} alt={post.altText} className={css(styles.image)} />
          <div class="card-img-overlay">
            <CardBody>
              <CardTitle className={css(styles.title)}>{post.title}</CardTitle>
              <CardText className={css(styles.text)}>{post.text}</CardText>
              <Button className={css(styles.button)} color="success" size="lg" href={post.link}>
                Read More
              </Button>
            </CardBody>
          </div>
        </Card>
        <Card className="d-block d-lg-none" style={{ border: 'none' }}>
          <CardImg top src={post.imgShort} alt={post.altText} className={css(styles.image)} />
          <div class="card-img-overlay" id="card">
            <CardBody>
              <CardTitle className={css(styles.title)}>{post.title}</CardTitle>
              <CardText className={css(styles.text)}>{post.text}</CardText>
              <Button className={css(styles.button)} color="success" href={post.link}>
                Read More
              </Button>
            </CardBody>
          </div>
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  card: {
    border: 'none',
  },
  button: {
    position: 'absolute',

    '@media only screen and (max-width:321px)': {
      bottom: '-9%',
      right: '-10%',
    },
    '@media only screen and (min-width:322px) and (max-width:376px)': {
      bottom: '-5%',
      right: '-7%',
    },
    '@media only screen and (min-width:377px) and (max-width:575px)': {
      bottom: '-5%',
      right: '-5%',
    },
    '@media only screen and (min-width:576px) and (max-width:675px)': {
      bottom: '-5%',
      right: '-5%',
    },
    '@media only screen and (min-width:676px) and (max-width:767px)': {
      bottom: '-5%',
      right: '-5%',
    },
    '@media only screen and (min-width:768px)': {
      bottom: '5%',
      right: '3%',
    },
  },
  image: {
    border: 0,
  },
  title: {
    padding: '2px',
    '@media only screen and (max-width:321px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '5vw',
      textAlign: 'left',
      fontWeight: 'bold',
      marginTop: '-15px',
      marginLeft: '-15px',
    },
    '@media only screen and (min-width:322px) and (max-width:376px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '5vw',
      textAlign: 'left',
      fontWeight: 'bold',
      marginTop: '-15px',
      marginLeft: '-15px',
    },
    '@media only screen and (min-width:377px) and (max-width:575px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '5vw',
      textAlign: 'left',
      fontWeight: 'bold',
      marginTop: '-15px',
      marginLeft: '-15px',
    },
    '@media only screen and (min-width:576px) and (max-width:676px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '16px',
      textAlign: 'left',
      fontWeight: 'bold',
      marginTop: '-15px',
      marginLeft: '-15px',
    },
    '@media only screen and (min-width:677px) and (max-width:767px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '20px',
      textAlign: 'left',
      fontWeight: 'bold',
      marginTop: '-15px',
      marginLeft: '-15px',
    },
    '@media only screen and (min-width:768px) and (max-width:991px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '22px',
      textAlign: 'left',
      fontWeight: 'bold',
      marginTop: '-15px',
      marginLeft: '-15px',
    },
    '@media only screen and (min-width:992px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: '3vw',
      marginTop: '-15px',
      marginLeft: '-15px',
    },
    position: 'absolute',
    top: '5%',
    left: '3%',
  },
  text: {
    position: 'absolute',
    textAlign: 'left',
    color: 'red',
    '@media only screen and (max-width:321px)': {
      backgroundColor: 'rgba(255,255,255, 0.7)',
      marginRight: '-15px',
      marginLeft: '-45px',
      marginTop: '-10px',
      fontSize: '4vw',
      height: '60px',
      overflow: 'hidden',
      color: 'black',
    },
    '@media only screen and (min-width:322px) and (max-width:374px)': {
      backgroundColor: 'rgba(255,255,255, 0.7)',
      marginRight: '-15px',
      marginLeft: '-45px',
      marginTop: '0px',
      fontSize: '4vw',
      height: '60px',
      overflow: 'hidden',
      color: 'black',
    },
    '@media only screen and (min-width:375px) and (max-width:575px)': {
      backgroundColor: 'rgba(255,255,255, 0.7)',
      marginRight: '-15px',
      marginLeft: '-45px',
      marginTop: '3vw',
      fontSize: '3.5vw',
      height: '20vw',
      overflow: 'hidden',
      color: 'black',
    },
    '@media only screen and (min-width:576px) and (max-width:675px)': {
      backgroundColor: 'rgba(255,255,255, 0.7)',
      marginRight: '-15px',
      marginLeft: '-45px',
      marginTop: '-8px',
      fontSize: '14px',
      height: '16vw',
      overflow: 'hidden',
      color: 'black',
    },
    '@media only screen and (min-width:676px) and (max-width:767px)': {
      backgroundColor: 'rgba(255,255,255, 0.7)',
      marginRight: '-15px',
      marginLeft: '-45px',
      marginTop: '0px',
      fontSize: '16px',
      height: '16vw',
      overflow: 'hidden',
      color: 'black',
    },
    '@media only screen and (min-width:768px) and (max-width:991px)': {
      backgroundColor: 'rgba(255,255,255, 0.7)',
      marginRight: '-15px',
      marginLeft: '-45px',
      marginTop: '10px',
      fontSize: '18px',
      height: '20vw',
      overflow: 'hidden',
      color: 'black',
    },
    '@media only screen and (min-width:992px)': {
      backgroundColor: 'rgba(255,255,255, 0.7)',
      marginRight: '50px',
      marginLeft: '-25px',
      marginTop: '15px',
      fontSize: '18px',
      height: '10vw',
      overflow: 'hidden',
      color: 'black',
    },
  },
});
