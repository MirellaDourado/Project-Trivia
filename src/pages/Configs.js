import React from 'react';
import PropTypes from 'prop-types';

class Configs extends React.Component {
  render() {
    const minusOne = -1;
    const { history } = this.props;
    return (
      <main className="configuration">
        <h2 data-testid="settings-title">
          Configuration
        </h2>
        <p> Coming soon... </p>
        <button
          type="button"
          onClick={ () => { console.log(history.go(minusOne)); } }
        >
          Home
        </button>
      </main>
    );
  }
}

Configs.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Configs;
