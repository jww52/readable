import C from '../actions/constants';

const initialState = {
  post: null,
  loading: false,
  error: null,
  selectedPost: [],
};

export function postDetailReducer(state = initialState, action) {
  switch (action.type) {
    case C.FETCH_POST_DETAIL:
      return {
        ...state,
        loading: true,
        error: null
      };
    case C.FETCH_POST_DETAIL_SUCCESS:
      return {
        ...state,
        post: action.post,
        error: null,
        loading: false
      };
    case C.FETCH_POST_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error.message.toString()
      };

    case C.GET_SELECTED_POST:
      return {
        ...state,
        loading: false,
        selectedPost: action.payload.post
      };

    default:
      return state;
  }
}
