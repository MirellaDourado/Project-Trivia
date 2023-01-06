import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { name, gravatarEmail, score, assertions } = this.props;
    const n = 3;
    return (
      <>
        <Header name={ name } gravatarEmail={ gravatarEmail } score={ (score) } />
        <section className="feedback-area">
          <p data-testid="feedback-text">
            {assertions < n ? 'Could be better...' : 'Well Done!'}
          </p>
          <div className="score-area">
            <p>Final Score:</p>
            <p data-testid="feedback-total-score">
              {score}
            </p>
            <p>Correct answer:</p>
            <p data-testid="feedback-total-question">
              {assertions}
            </p>
          </div>
        </section>
        <div className="buttons-feedback-area">
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              style={ { backgroundColor: '#44B5A6', border: 'none' } }
            >
              Play Again
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              style={ {
                backgroundColor: 'transparent',
                border: '3px #44B5A6 solid',
                color: '#44B5A6',
                fontWeight: '800',
              } }
            >
              Rank
            </button>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
