import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField'
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import Loading from 'react-loading'

import { getSpecificPost, postVote, deletePost, editPost } from '../actions'
import Comments from './Comments'

class PostDetail extends Component {
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

  componentDidMount(props){
    const selectedPost = this.props.match.params.id
    this.props.getSpecificPost(selectedPost)
  }

  onVoteUp = (e, post) => {
    e.preventDefault();
    const {id} = post
    this.props.postVote(id, "upVote");
  }

  onVoteDown = (e, post) => {
    e.preventDefault();
    const {id} = post
    this.props.postVote(id, "downVote");
  }

  onDelete = (post) => {
    const param = this.props.match.params.category
    this.props.deletePost(param, post.id)
    this.props.history.push(`/${post.category}`)
    }

  handleTitleEdit = (e, value) => {
      e.preventDefault();
      this.setState({ newTitle: e.target.value, titleEditToggle: true });
    }

  handleBodyEdit = (e, value) => {
  		e.preventDefault();
  		this.setState({ newBody: e.target.value, bodyEditToggle: true });
  	}

    submitEdit = (post) => {
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
      this.props.editPost(updatedPost)
      this.props.history.push(`/${category}/${id}`);
      this.closeEditModal();
    }

render(){
  const { loading, error } = this.props
  const { ...post }  = this.props.selectedPost;
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
          onClick={() => this.submitEdit(post)}
        />,
      ];

    return (
      <div>
        {loading === true ? <div><Loading type='spin' color='#222' className='loading' /></div> : null }
        {error !== undefined ? <div>{error}</div> : null}
        { Object.keys(post).length === 0 && loading === false
              ? <h1>404 Nothing Here Homey</h1> :
      <div className="containers">

        <FlatButton
          label="Back to Main"
          containerElement={<Link to="/"/>}
        />

        <FlatButton label={`${post.category}`} disabled={true} />
        <Card
          expanded={true}
          >
          <CardTitle actAsExpander={true} title={post.title} subtitle={`by ${post.author}`} />
            <CardHeader title={`Votes: ${post.voteScore}`}
            actAsExpander={true}
            showExpandableButton={false}
          />
          <CardActions>

            <FloatingActionButton secondary={true} onClick={() => this.onDelete(post) } containerElement={<Link to={`/${post.category}`}/>}>
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
          <CardText expanded='true'>
            {post.body}
          </CardText>
        </Card>
        <div>

          <Comments postId={this.props.postUrl}/>
        </div>

      </div>
      }
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  selectedPost: state.postDetail.selectedPost,
  postUrl: ownProps.match.params.id,
  loading: state.postDetail.loading,
  error: state.posts.error,
});

function mapDispatchToProps (dispatch) {
  return {
    getSpecificPost: (selectedPost) => dispatch(getSpecificPost(selectedPost)),
    postVote: (postId, string) => dispatch(postVote(postId, string)),
    deletePost: (param, postId) => dispatch(deletePost(param, postId)),
    editPost: (updatedPost) => dispatch(editPost(updatedPost)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail))
