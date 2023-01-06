const INITIAL_STATE = {
  name: '',
  assertions: 0, // número - de - acertos
  score: 0, // pontuação
  gravatarEmail: '', // email-da-pessoa
  avatar: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_PLAYER_DATA':
    return (
      {
        ...state,
        name: action.name,
        gravatarEmail: action.email,
      }
    );
  case 'ADD_PLAYER_AVATAR':
    return (
      {
        ...state,
        avatar: action.avatar,
      }
    );
  case 'ADD_ASSERTIONS':
    return (
      {
        ...state,
        assertions: state.assertions + 1,
      }
    );
  case 'ADD_SCORE':
    return (
      {
        ...state,
        score: action.score,
      }
    );
  default:
    return state;
  }
}

export default player;
