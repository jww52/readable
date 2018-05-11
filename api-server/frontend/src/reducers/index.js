import { combineReducers } from 'redux';

import { categoriesReducer } from './categoriesReducer';
import { commentsReducer } from './commentsReducer';
import { postsReducer } from './postsReducer';
import { postDetailReducer } from './postDetailReducer';

export default combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer,
  postDetail: postDetailReducer,
});
