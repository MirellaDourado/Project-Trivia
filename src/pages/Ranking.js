import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Rankinng extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const getRanking = JSON.parse(localStorage.getItem('ranking'));
    const storageSort = getRanking.ranking.sort((a, b) => b.score - a.score);
    const filteredWinner = storageSort[0];
    const others = getRanking.ranking
      .filter((a) => a.name !== filteredWinner.name);
    const othersSort = others.sort((a, b) => a.score - b.score);
    const newArr = [filteredWinner, ...othersSort];
    this.setState({ ranking: newArr });
  }

  render() {
    const maxRankedPlayers = 5;
    const { ranking } = this.state;
    return (
      <section className="ranking-area">
        <h2
          data-testid="ranking-title"
        >
          RANK PLAYERS
        </h2>
        <ol>
          { ranking.map((player, i) => i <= maxRankedPlayers && (
            <li>
              <img src={ player.avatar } alt={ player.name } />
              <p data-testid={ `player-name-${i}` }>
                { player.name }
              </p>
              <p data-testid={ `player-score-${i}` }>
                { player.score }
              </p>
            </li>
          ))}
        </ol>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Home
          </button>
        </Link>
      </section>
    );
  }
}

export default Rankinng;
