import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import logo from '../trivia.png';
import Header from '../components/Header';
import Counter from '../components/Counter';
import { addScore, addAssertions } from '../redux/actions/index';

class Game extends Component {
  state = {
    index: 0,
    showColors: false,
    timeAns: 0,
    score: 0,
  };

  Embaralha = (li) => {
    for (let indice = li.length; indice; indice -= 1) {
      const indiceAleatorio = Math.floor(Math.random() * indice);
      [li[indice - 1], li[indiceAleatorio]] = [li[indiceAleatorio], li[indice - 1]];
    }
    return li;
  };

  mapQuestions = () => {
    const { index, showColors } = this.state;
    const { questions } = this.props;
    let x = 0;
    const newList = questions.map((question) => {
      const answerList = [];
      question.incorrect_answers.forEach((ans) => {
        answerList.push(ans);
      });
      answerList.push(question.correct_answer);
      const randomList = this.Embaralha(answerList);
      return (
        <div key={ question.question }>
          <Counter
            showColorsFunc={ this.showColors }
            showColors={ showColors }
            incrementIndex={ this.incrementIndex }
            getTheTime={ this.getTheTime }
          />
          <div className="question">
            <p data-testid="question-category">{question.category}</p>
            <p data-testid="question-text">{question.question}</p>
          </div>
          <div data-testid="answer-options" className="answers">
            {randomList.map((ans) => {
              if (ans === question.correct_answer) {
                return (
                  <button
                    className={ showColors ? 'correct-border' : '' }
                    data-testid="correct-answer"
                    key={ ans }
                    type="button"
                    onClick={ () => this.CountScore(question) }
                    disabled={ showColors }
                  >
                    {ans}
                  </button>
                );
              }
              const dtest = `wrong-answer-${x}`;
              x += 1;
              return (
                <button
                  className={ showColors ? 'incorrect-border' : '' }
                  data-testid={ dtest }
                  key={ ans }
                  type="button"
                  onClick={ this.showColors }
                  disabled={ showColors }
                >
                  {ans}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
    return newList[index];
  };

  incrementIndex = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1,
      showColors: false,
    });
  };

  showColors = () => {
    this.setState({ showColors: true });
  };

  CountScore = (quest) => {
    const { timeAns } = this.state;
    const hardValue = 3;
    const mediumValue = 2;
    const fixedTen = 10;
    this.showColors();
    let difficulty = 1;
    if (quest.difficulty === 'hard') difficulty = hardValue;
    if (quest.difficulty === 'medium') difficulty = mediumValue;
    this.setState((prev) => ({
      score: prev.score + (fixedTen + (timeAns * difficulty)),
    }), () => this.saveScoreRedux());
  };

  saveScoreRedux = () => {
    const { score } = this.state;
    const { dispatch } = this.props;
    dispatch(addScore(score));
    dispatch(addAssertions());
  };

  getTheTime = (seconds) => {
    this.setState({ timeAns: seconds });
  };

  render() {
    const { history } = this.props;
    const { index } = this.state;
    const maxQuestion = 5;
    // help from group 24
    if (index === maxQuestion) {
      const { name, score, avatar } = this.props;
      let ranking = [];
      const ourLocalStorage = localStorage.getItem('ranking') || undefined;
      if (ourLocalStorage !== undefined) {
        ranking = JSON.parse(localStorage.getItem('ranking'));
      }
      if (ourLocalStorage === undefined) {
        const format = {
          ranking: [
            { name, score, avatar },
          ],
        };
        localStorage.setItem('ranking', JSON.stringify(format));
      } else {
        const arr = { name, score, avatar };
        ranking.ranking.push(arr);
        localStorage.setItem('ranking', JSON.stringify(ranking));
      }
      return history.push('/feedback');
    }
    return (
      <main className="gameArea">
        <Header />
        {/* <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>GAME AREA</p>
        </header> */}
        { this.mapQuestions() }
      </main>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  avatar: state.player.avatar,
});

export default connect(mapStateToProps)(Game);
