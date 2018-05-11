import React, { Component } from 'react';
import { connect } from "react-redux"
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import { fetchComments, getUUID, addComment } from '../actions'

import CommentsDetail from './CommentsDetail'
import Sort from './Sort'

class Comments extends Component {
  state = {
    open: false,
    body: '',
    author: '',
    timestamp: null,
    id: null,
  }

componentDidMount() {
  const { postId } = this.props
  this.props.fetchComments(postId)
}

openCommentModal = () => this.setState(() => ({
    open: true,
  }))
closeCommentModal = () => this.setState(() => ({
    open: false,
  }))

handleBodyChange = (e, value) => {
  		e.preventDefault();
  		this.setState({ body: e.target.value });
  	}
handleAuthorChange = (e, value) => {
      e.preventDefault();
      this.setState({ author: e.target.value });
      }

  submit = () => {
      const body = this.state.body;
      const id = getUUID();
      const timestamp = Date.now();
      const category = this.state.value;
      const author = this.state.author;
      const parentId = this.props.postId;
      const comment = {
           id,
           timestamp,
           category,
           author,
           body,
           parentId,
        }
        this.props.addComment(comment)
        this.setState({ body: '', title: '', author: ''})
        this.closeCommentModal();
      }

  render() {
    const { comments } = this.props

    const addCommentActions = [
      <TextField
        name="author"
        floatingLabelText="Author"
        value={this.state.author}
        onChange={this.handleAuthorChange}
        fullWidth={false}
      />,
        <TextField
          name="body"
          floatingLabelText="Post Body"
          value={this.state.body}
          onChange={this.handleBodyChange}
          fullWidth={true}
        />,
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.closeCommentModal}
        />,
        <FlatButton
          label="Submit"
          type="submit"
          primary={true}
          onClick={this.submit}
        />,
      ];

    return (
      <div>
        <h1>Comments</h1>
        <FloatingActionButton onClick={this.openCommentModal}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Make a Comment"
          actions={addCommentActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeCommentModal}
        >
        </Dialog>
        <Sort comments={comments}/>
        {comments.map((c) => (
          <div key={c.id}>
            <CommentsDetail comment={c}/>
          </div>
        ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: state.comments.comments,
  postId: ownProps.postId,
});

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    addComment: (commentObj) => dispatch(addComment(commentObj)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Comments);
