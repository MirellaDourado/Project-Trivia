const INITIAL_STATE = {
  questions: [],
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_QUESTIONS':
    return (
      {
        questions: action.payload,
      }
    );

  default:
    return state;
  }
}

export default questionsReducer;
