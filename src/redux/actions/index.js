export const addPlayer = (email, name) => ({
  type: 'ADD_PLAYER_DATA',
  email,
  name,
});

export const addPlayerAvatar = (src) => ({
  type: 'ADD_PLAYER_AVATAR',
  avatar: src,
});

export const addAssertions = () => ({
  type: 'ADD_ASSERTIONS',
  // assertions,
});

export const addScore = (score) => ({
  type: 'ADD_SCORE',
  score,
});

export const addQuestions = (questionsArr) => ({
  type: 'ADD_QUESTIONS',
  payload: questionsArr,
});
