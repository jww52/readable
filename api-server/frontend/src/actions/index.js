import { api, headers } from '../utils/api'
import C from './constants'

export const beginFetchPosts = () => ({
  type: C.BEGIN_FETCH_POSTS,
})

export const beginFetchSelectPost = () => ({
  type: C.FETCH_POST_DETAIL,
})

export const fetchPostsFailed = (error) => ({
  type: C.FETCH_POSTS_FAILED,
  payload: { error },
})

export const fetchPostsSuccess = (posts) => {
  return {
  type: C.FETCH_POSTS_SUCCESS,
  payload: { posts }
  }
}

export const fetchSortedPostsSuccess = (sortedPosts) => ({
  type: C.FETCH_SORTED_POSTS_SUCCESS,
  payload: { sortedPosts }
})


export const selectPostSuccess = (post) => ({
  type: C.GET_SELECTED_POST,
  payload: { post }
})

export const addPostSuccess = (postObj) => ({
  type: C.ADD_POST,
  payload: { postObj }
})

export function fetchPosts(selectedCategory) {
  return dispatch => {
    dispatch(beginFetchPosts());
    return fetch(selectedCategory === "all" ? `${api}/posts` : `${api}/${selectedCategory}/posts`, { headers })
      .then(
        res => res.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        dispatch(fetchPostsSuccess(json));
        return json;
      })
    }
  }

  export function setSortedPosts(sortedPosts) {
    return dispatch => {
          dispatch(fetchSortedPostsSuccess(sortedPosts));
          return sortedPosts;
        }
      }

  export function getSpecificPost(selectedPost){

  return (dispatch) => {
    dispatch(beginFetchSelectPost());
    const baseURL = selectedPost ? `${api}/posts/${selectedPost}` : null
      fetch(baseURL, {
        method: 'GET',
        headers: {
        ...headers,
        'content-type': 'application/json'
      },
    }).then(
          res => res.json(),
          error => console.log('An error occured at getSpecificPost', error)
        ).then(json => {
      dispatch(selectPostSuccess(json))
      return json;
    })
  }
}

export function getUUID() {
  return (Math.random().toString(36).substring(2)+(new Date()).getTime().toString(36));
}

export const addPost = (postObj) => {
  return (dispatch) => {
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ ...postObj })
    }).then(
        res => res.json(),
        error => console.log('An error occrred at addPost ', error)
    ).then(json => {
      dispatch(addPostSuccess(json))
    }).then(json => {
      dispatch(fetchPosts(postObj.category))
    })
  }
}

export const deletePost = (param, postId) => {
  return (dispatch) => {
    fetch(`${api}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'content-type': 'application/json'
      }
    }).then(
      res => res.json(),
      error => console.log('An error occurred at deletePost', error)
    )
      .then(json => {
        if (param && param.length) {
          dispatch(fetchPosts(param))
        }
        if (!param) {
          dispatch(fetchPosts("all"))
          }
      })
    }
  }

export const postVote = (postId, string) => {
  return (dispatch) => {
    fetch(`${api}/posts/${postId}`, {
      method: 'POST',
      headers: {
        ...headers,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ option: string }),
    }).then(
      res => res.json(),
      error => (console.log('postVote error', error))
    )
    .then(
      dispatch(getSpecificPost(postId))
    );
    }
  }

export const postVoteList = (postId, string, category) => {
  return (dispatch) => {
    fetch(`${api}/posts/${postId}`, {
      method: 'POST',
      headers: {
        ...headers,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ option: string }),
    }).then(
      dispatch(fetchPosts(category))
      )
    }
  }

export const editPost = (updatedPost) => {
  const { title } = updatedPost
  const { body } = updatedPost
  const { id } = updatedPost
  return (dispatch) => {
    fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ body, title }),
    }).then(
      res => res.json(),
      error => error => console.log('An error occrred at editPost ', error)
    ).then(
      dispatch(getSpecificPost(id))
    )
  }
}

export const editPostList = (updatedPost, category) => {
  const { title } = updatedPost
  const { body } = updatedPost
  const { id } = updatedPost
  return (dispatch) => {
    fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ body, title }),
    }).then(
      res => res.json(),
      error => error => console.log('An error occrred at editPost ', error)
    ).then(
      dispatch(fetchPosts(category))
    )
  }
}

  //categories

export const beginFetchCategories = () => ({
  type: C.BEGIN_FETCH_CATEGORIES
});

export const fetchCategoriesSuccess = categories => ({
  type: C.FETCH_CATEGORIES_SUCCESS,
  payload: { categories }
});

export const fetchCategoriesFailed = error => ({
  type: C.FETCH_CATEGORIES_FAILED,
  payload: { error }
});

export const getSelectedCategory = selectedCategory => ({
  type: C.GET_SELECTED_CATEGORY,
  payload: { selectedCategory }
})

export function fetchCategories() {
return dispatch => {
  dispatch(beginFetchCategories());
  return fetch(`${api}/categories`, { headers })
    .then(
      res => res.json(),
      error => console.log('An error occured.', error)
    )
    .then(json => {
      dispatch(fetchCategoriesSuccess(json.categories));
      return json.categories;
    })
};
}


// commentsReducer

export const beginFetchComments = () => ({
  type: C.BEGIN_FETCH_COMMENTS,
})

export const fetchCommentsFailed = (error) => ({
  type: C.FETCH_COMMENTS_FAILED,
  payload: { error },
})

export const fetchCommentsSuccess = (comments) => ({
    type: C.FETCH_COMMENTS_SUCCESS,
    payload: { comments }
})

export const addCommentSuccess = (comment) => ({
    type: C.ADD_COMMENT,
    payload: { comment }
})

export const selectCommentSuccess = (comment) => ({
  type: C.GET_SELECTED_COMMENT,
  payload: { comment }
})

export const fetchSortedCommentsSuccess = (sortedComments) => ({
  type: C.FETCH_SORTED_COMMENTS_SUCCESS,
  payload: { sortedComments }

})

export function fetchComments(postId) {
  return dispatch => {
    dispatch(beginFetchComments());
    return fetch(`${api}/posts/${postId}/comments`, { headers })
      .then(
        res => res.json(),
        error => console.log('An error occurred at fetchComments', error)
      )
      .then(json => {
        dispatch(fetchCommentsSuccess(json));
        return json;
      })
  };
}



export const addComment = (commentObj) => {
  return (dispatch) => {
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ ...commentObj })
    }).then(
        res => res.json(),
        error => console.log('An error occrred at addComment ', error)
    ).then(json => {
      dispatch(fetchComments(json.parentId))
      return json
    })
  }
}

export const deleteComment = (commentId) => {
  return (dispatch) => {
    fetch(`${api}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'content-type': 'application/json'
      }
    }).then(
      res => res.json(),
      error => console.log('An error occurred at deletePost', error)
    ).then(json => {
      dispatch(fetchComments(json.parentId))
      return json
    })
  }
}

export const editComment = (updatedComment) => {
  const { body } = updatedComment
  const { id } = updatedComment
  const { timestamp } = updatedComment
  return (dispatch) => {
    fetch(`${api}/comments/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ body, timestamp }),
    }).then(
      res => res.json(),
      error => console.log('An error occrred at editComment ', error)
    ).then(json =>
      dispatch(fetchComments(json.parentId))
    )
  }
}

export const commentVote = (commentId, string) => {
  return (dispatch) => {
    fetch(`${api}/comments/${commentId}`, {
      method: 'POST',
      headers: {
        ...headers,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ option: string }),
    }).then(
      res => res.json(),
      error => (console.log('commentVote error', error))
    )
    .then(json =>
      dispatch(fetchComments(json.parentId))
    );
    }
  }

  export function setSortedComments(sortedComments) {
    return dispatch => {
          dispatch(fetchSortedCommentsSuccess(sortedComments));
          return sortedComments;
        }
      }

 
