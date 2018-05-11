import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux"

import { fetchPosts, getSpecificPost, postVoteList, deletePost, getSelectedCategory, editPostList } from '../actions'

class PostPreview extends Component {
  state = {
    editModalOpen: false,
    newBody: '',
    newTitle: '',
    titleEditToggle: false,
    bodyEditToggle: false,
    loading: true,
  }

  openEditPostModal = () => this.setState(() => ({
      editModalOpen: true,
    }))

  closeEditModal = () => this.setState(() => ({
      editModalOpen: false,
    }))

  onDelete = (post) => {
    const param = this.props.match.params.category
    if (param && param.length){
      this.props.history.push(`/${param}`)
      } else {
        this.props.history.push("/")
      }
      this.props.deletePost(param, post.id)
    }

    onVoteUp = (e, post) => {
      e.preventDefault();
      const {id} = post;
      const {selectedCategory} = this.props
        this.props.postVoteList(id, "upVote", selectedCategory)
    }

    onVoteDown = (e, post) => {
      e.preventDefault();
      const {id} = post
      const {selectedCategory} = this.props
        this.props.postVoteList(id, "downVote", selectedCategory)
    }

    handleTitleEdit = (e, value) => {
        e.preventDefault();
        this.setState({ newTitle: e.target.value, titleEditToggle: true });
      }

    handleBodyEdit = (e, value) => {
        e.preventDefault();
        this.setState({ newBody: e.target.value, bodyEditToggle: true });
      }

      submitEditList = (post) => {
      const viewCategory = this.props.selectedCategory
      const id = post.id
      const timestamp = post.timestamp
      const category = post.category;
      const author = post.author;
      const body = this.state.bodyEditToggle ? this.state.newBody : post.body;
      const title = this.state.titleEditToggle ? this.state.newTitle : post.title;
      const updatedPost = {
           id,
           timestamp,
           category,
           author,
           title,
           body,
        }
        this.props.editPostList(updatedPost, viewCategory)
        this.closeEditModal();
      }

  render() {
    const { post } = this.props

    const editActions = [
      <TextField
        name="title"
        floatingLabelText="Title"
        defaultValue={post.title}
        onChange={this.handleTitleEdit}
        fullWidth={false}
      />,
      <TextField
        name="author"
        floatingLabelText="Author"
        value={post.author}
        fullWidth={false}
      />,
        <TextField
          name="body"
          floatingLabelText="Post Body"
          defaultValue={post.body}
          onChange={this.handleBodyEdit}
          fullWidth={true}
        />,
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.closeEditModal}
        />,
        <FlatButton
          label="Submit"
          type="submit"
          primary={true}
          onClick={() => this.submitEditList(post)}
        />,
      ];

    return (
      <div>
        <Card>
          <FlatButton
            label={`${post.category}`}
            disabled={true}
          />
          <CardTitle actAsExpander={true} title={post.title} subtitle={`by ${post.author}`} />
            <CardHeader
            title={`Votes: ${post.voteScore} `}
            actAsExpander={true}
            showExpandableButton={false}
            />
            <CardHeader
            title={`Comments: ${post.commentCount} `}
            actAsExpander={true}
            showExpandableButton={false}
            />
          <CardActions>
            <FlatButton
              label="See Thread"
              containerElement={<Link to={`/${post.category}/${post.id}`} />}
            />
            </CardActions>
              <CardActions>
            <FloatingActionButton secondary={true} onClick={() => this.onDelete(post) }>
              <ContentClear />
            </FloatingActionButton>
            <FlatButton
              label="Vote Up"
              onClick={(e) => this.onVoteUp(e, post)}
            />
            <FlatButton
              label="Vote Down"
              onClick={(e) => this.onVoteDown(e, post)}
            />
            <FlatButton
              label="Edit Post"
              onClick={this.openEditPostModal}
            />
            <Dialog
              title="Edit Post"
              actions={editActions}
              modal={false}
              open={this.state.editModalOpen}
              onRequestClose={this.closeEditModal}
            >
            </Dialog>
          </CardActions>
          <CardText expandable={true}>
            {post.body}
          </CardText>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error,
  selectedCategory: state.categories.selectedCategory,
  selectedPost: state.postDetail.post,
});

function mapDispatchToProps (dispatch) {
  return {
    getSpecificPost: (selectedPost) => dispatch(getSpecificPost(selectedPost)),
    fetchPosts: (selectedCategory) => dispatch(fetchPosts(selectedCategory)),
    postVoteList: (postId, string, category) => dispatch(postVoteList(postId, string, category)),
    deletePost: (param, postId) => dispatch(deletePost(param, postId)),
    getSelectedCategory: (selectedCategory) => dispatch(getSelectedCategory(selectedCategory)),
    editPostList: (updatedPost, category) => dispatch(editPostList(updatedPost, category)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPreview))
