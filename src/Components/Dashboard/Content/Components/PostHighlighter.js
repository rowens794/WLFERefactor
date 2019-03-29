import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';

import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';

export default class PostHighlighter extends Component {
  posts = {
    post1: {
      title: 'post 1',
      text: 'lorem ipsum extceta dolar morgalis',
      img: 'www.google.com/img',
      link: 'this is the blurb text',
    },
    post2: {
      name: 'post 2',
      img: 'www.google.com/img',
      link: 'this is the blurb text 2',
    },
  };
  render() {
    return (
      <Container className={css(styles.container)}>
        <Card className="d-none d-lg-block">
          <CardImg
            top
            src="https://res.cloudinary.com/dfebwzrhb/image/upload/v1553799388/Test_1200x314.jpg"
            alt="Card image cap"
            className={css(styles.image)}
          />
          <div class="card-img-overlay">
            <CardBody>
              <CardTitle className={css(styles.title)}>Lorem Ipsum is simply dummy text of</CardTitle>
              <CardText className={css(styles.text)}>
                Lorem ipsum dolor sit amet, eu probo solet decore sit, tation nusquam consulatu nec ne, sed an mazim
                mediocritatem. Essent antiopam consetetur ut eam. Tale facilisis ut his, solet melius legendos pri an,
                sit te quodsi delicata. Mei an falli aliquip, essent integre explicari eos et. Te placerat percipitur
                conclusionemque usu, has ea unum dolorum habemus. Legere periculis eam ei, vide elit propriae duo ut.
              </CardText>
              <Button className={css(styles.button)} color="success" size="lg">
                Read More
              </Button>
            </CardBody>
          </div>
        </Card>
        <Card className="d-block d-lg-none">
          <CardImg
            top
            src="https://res.cloudinary.com/dfebwzrhb/image/upload/v1553799226/test.jpg"
            alt="Card image cap"
            className={css(styles.image)}
          />
          <div class="card-img-overlay" id="card">
            <CardBody>
              <CardTitle className={css(styles.title)}>Lorem Ipsum is simply dummy text of</CardTitle>
              <CardText className={css(styles.text)}>
                Lorem ipsum dolor sit amet, eu probo solet decore sit, tation nusquam consulatu nec ne, sed an mazim
                mediocritatem. Essent antiopam consetetur ut eam. Tale facilisis ut his, solet melius legendos pri an,
                sit te quodsi delicata. Mei an falli aliquip, essent integre explicari eos et. Te placerat percipitur
                conclusionemque usu, has ea unum dolorum habemus. Legere periculis eam ei, vide elit propriae duo ut.
              </CardText>
              <Button className={css(styles.button)} color="success">
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
  button: {
    position: 'absolute',
    bottom: '5%',
    right: '3%',
  },
  title: {
    padding: '2px',
    '@media only screen and (max-width:575px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '4vw',
    },
    '@media only screen and (min-width:576px) and (max-width:767px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '2.5vw',
    },
    '@media only screen and (min-width:768px) and (max-width:991px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '3.5vw',
    },
    '@media only screen and (min-width:992px)': {
      backgroundColor: 'rgba(255,255,255, 0.5)',
      fontSize: '3vw',
    },
    position: 'absolute',
    top: '5%',
    left: '3%',
  },
  subtitle: {
    // position: 'absolute',
    // top: '22%',
    // left: '3%',
  },
  text: {
    position: 'absolute',
    left: '5%',
    textAlign: 'left',
    padding: '2px',
    '@media only screen and (max-width:575px)': {
      backgroundColor: 'rgba(255,255,255, 0.3)',
      marginTop: '4px',
      maxHeight: '16vw',
      fontSize: '3.5vw',
      marginRight: '2vw',
      top: '20%',
      overflow: 'hidden',
    },
    '@media only screen and (min-width:576px) and (max-width:767px)': {
      backgroundColor: 'rgba(255,255,255, 0.3)',
      maxHeight: '13vw',
      fontSize: '2.2vw',
      marginRight: '2vw',
      top: '20%',
      overflow: 'hidden',
    },
    '@media only screen and (min-width:768px) and (max-width:991px)': {
      backgroundColor: 'rgba(255,255,255, 0.3)',
      maxHeight: '15vw',
      fontSize: '2.5vw',
      marginRight: '2vw',
      top: '20%',
      overflow: 'hidden',
    },
    '@media only screen and (min-width:992px)': {
      backgroundColor: 'rgba(255,255,255, 0.3)',
      marginTop: '5px',
      maxHeight: '9vw',
      marginRight: '13vw',
      fontSize: '1.5vw',
      top: '30%',
      overflow: 'hidden',
    },
  },
});
