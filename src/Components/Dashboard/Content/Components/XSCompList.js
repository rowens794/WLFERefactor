import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import colors from '../../../Styling/styles';
import { Spring, animated } from 'react-spring';

class XSCompList extends Component {
  constructor(props) {
    super();

    this.state = {
      show: false,
      label: 'Show Competitions',
    };
  }

  showHideToggle() {
    if (this.state.show) {
      this.setState({
        show: !this.state.show,
        label: 'Show Competitions',
      });
    } else {
      this.setState({
        show: !this.state.show,
        label: 'Hide Competitions',
      });
    }
  }

  clickCombine(compID, compAdmin) {
    this.showHideToggle();
    this.props.getCompData(compID, compAdmin);
  }

  render() {
    return (
      <div className={css(styles.mobileBar)}>
        <Spring
          native
          force
          config={{ tension: 2000, friction: 100, precision: 1 }}
          from={{ height: this.state.show ? 0 : 'auto' }}
          to={{ height: this.state.show ? 'auto' : 0 }}
        >
          {(props) => (
            <animated.div className="item" style={props}>
              {this.props.compList && this.state.show
                ? this.props.compList.map((comp) => {
                    return (
                      <div key={comp.id} onClick={() => this.clickCombine(comp.id, comp.admin)}>
                        {' '}
                        {comp.name}{' '}
                      </div>
                    );
                  })
                : null}
            </animated.div>
          )}
        </Spring>

        <p className={css(styles.toggler)} onClick={() => this.showHideToggle()}>
          {this.state.label} ({this.props.compList.length})
        </p>
      </div>
    );
  }
}

export default XSCompList;

const styles = StyleSheet.create({
  mobileBar: {
    backgroundColor: colors.black,
    width: '100%',
    color: colors.white,
    marginTop: '-1px',
    paddingTop: '25px',
    paddingBottom: '5px',
  },
  toggler: {
    backgroundColor: colors.grey,
    paddingTop: '0px',
    fontWeight: 'bold',
  },
});
