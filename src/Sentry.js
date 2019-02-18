import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

class ExampleBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    Sentry.init({
      dsn: 'https://674f53935c8c4d21a15cb72954dfaec8@sentry.io/1360389',
    });

    if (this.state.error) {
      //render fallback UI
      return <p onClick={() => Sentry.showReportDialog()}>Report feedback</p>;
    } else {
      //when there's not an error, render children untouched
      return this.props.children;
    }
  }
}

export default ExampleBoundary;
