import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  test = () => {
    const { incrementIndex } = this.props;
    incrementIndex();
    this.timer();
  };

  timer = () => {
    const { showColorsFunc, getTheTime } = this.props;
    const oneSecond = 1000;
    const limite = 30000;
    const { seconds } = this.state;
    const timer = setInterval(() => this.setState((prev) => ({
      seconds: prev.seconds - 1,
    })), oneSecond);
    setTimeout(() => {
      clearInterval(timer);
      showColorsFunc();
      this.setState({ seconds: 30 });
    }, limite);
    getTheTime(seconds);
  };

  nextRender = () => {
    const { showColors } = this.props;
    if (showColors === true) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => this.test() }
          disabled={ !showColors }
        >
          Next
        </button>
      );
    }
  };

  render() {
    const { seconds } = this.state;
    return (
      <div className="timer">
        <p className="time">{`00:${seconds}`}</p>
        {this.nextRender()}
      </div>
    );
  }
}

Counter.propTypes = {
  showColorsFunc: PropTypes.func.isRequired,
  showColors: PropTypes.bool.isRequired,
  incrementIndex: PropTypes.func.isRequired,
  getTheTime: PropTypes.func.isRequired,
};

export default Counter;
