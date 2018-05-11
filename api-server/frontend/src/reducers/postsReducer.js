import C from '../actions/constants';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  sorted: false,
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case C.BEGIN_FETCH_POSTS:
      return {
        ...state,
        loading: true,
        error: null
      };

    case C.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts
      };

      case C.FETCH_SORTED_POSTS_SUCCESS:
        return {
          ...state,
          loading: false,
          posts: action.payload.sortedPosts,
        };

    case C.FETCH_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error.message.toString(),
        posts: []
      };

    case C.ADD_POST:
      const hasPost = state.posts.some(
        post => post.id === action.payload.postObj.id
      );
      return hasPost
        ? state
        : {
            ...state,
            posts: action.payload.postObj
          };

    default:
      return state;
  }
}
