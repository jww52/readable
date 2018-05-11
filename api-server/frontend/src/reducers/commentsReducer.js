import C from '../actions/constants';

const commentsInitialState = {
  comments: [],
  loading: false,
  error: null,
  selectedComment: [],
};

export function commentsReducer(state = commentsInitialState, action) {
  switch (action.type) {
    case C.BEGIN_FETCH_COMMENTS:
      return {
        ...state,
        loading: true,
        error: null
      };

  case C.FETCH_COMMENTS_SUCCESS:
  return {
    ...state,
    comments: action.payload.comments
  };

    case C.FETCH_COMMENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error.message.toString(),
        comments: []
      };

  case C.ADD_COMMENT:
  const hasComment = state.comments.some(
    comment => comment.id === action.payload.comment.id
  );
  return hasComment
    ? state
    : {
      ...state,
      comments: action.payload.comment
    };

  case C.GET_SELECTED_COMMENT:
  return {
    ...state,
    loading: false,
    selectedComment: action.payload.comment
  };

  case C.FETCH_SORTED_COMMENTS_SUCCESS:
    return {
      ...state,
      loading: false,
      comments: action.payload.sortedComments,
    };

    default:
      return state;
  }
}
