import C from '../actions/constants';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  selectedCategory: "all",
};

export function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    // loading - to show spinner
    case C.BEGIN_FETCH_CATEGORIES:
      return {
        ...state,
        loading: true,
        error: null
      };

    // hide spinner, get categories from the server, save that to state
    case C.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories
      };

    // fetch errored
    case C.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error.message.toString(),
        categories: []
      };

    case C.GET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory
      };

    default:
      return state;
  }
}
