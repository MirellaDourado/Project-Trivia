import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { addPlayer, addQuestions } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nome: '',
      email: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getTrivia = async () => {
    const { history, dispatch } = this.props;
    const { email, nome } = this.state;
    dispatch(addPlayer(email, nome));
    this.getTriviaToken();
    history.push('/game');
  };

  getTriviaToken = async () => {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const requestJson = await request.json();
    localStorage.setItem('token', requestJson.token);
    this.getTriviaQuestions(requestJson.token);
  };

  getTriviaQuestions = async (token) => {
    const { history, dispatch } = this.props;
    const questionNumber = 5;
    const request = await fetch(`https://opentdb.com/api.php?amount=${questionNumber}&token=${token}`);
    const requestJson = await request.json();
    if (requestJson.response_code === 0) {
      dispatch(addQuestions(requestJson.results));
    } else {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  render() {
    const { nome, email } = this.state;
    const { history } = this.props;
    return (
      <main className="login">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form>
          <div className="inputs">
            <label htmlFor="nome">
              Name
              <input
                type="text"
                name="nome"
                data-testid="input-player-name"
                value={ nome }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Mail
              <input
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div className="login-buttons">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !nome || !email }
              onClick={ this.getTrivia }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              type="button"
              onClick={ () => { history.push('/configs'); } }
            >
              Configurations
            </button>
          </div>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
