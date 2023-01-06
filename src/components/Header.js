import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPlayerAvatar } from '../redux/actions/index';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name, score, dispatch } = this.props;
    const gravatar = md5(gravatarEmail).toString();
    const endPoint = `https://www.gravatar.com/avatar/${gravatar}`;
    dispatch(addPlayerAvatar(endPoint));
    return (
      <header>
        <div>
          <img data-testid="header-profile-picture" src={ endPoint } alt={ endPoint } />
          <p data-testid="header-player-name">{ name }</p>
        </div>
        <p htmlFor="header-score">
          Score:
          <span data-testid="header-score">
            { score === undefined ? 0 : score }
          </span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
