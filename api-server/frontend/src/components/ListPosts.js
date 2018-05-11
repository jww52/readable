import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from "react-redux"

import { fetchPosts, getUUID, addPost, getSpecificPost, getSelectedCategory } from '../actions'
import Loading from 'react-loading'

import PostPreview from './PostPreview'
import Categories from './Categories'
import Sort from './Sort'

class ListPosts extends Component {
  state = {
    open: false,
    body: '',
    value: 'react',
    title: '',
    author: '',
    timestamp: null,
    id: null,
  }

  componentDidMount() {
    const selectedCategory = this.props.selectedCategory;
    this.props.fetchPosts(selectedCategory);
  }

  openPostModal = () => this.setState(() => ({
      open: true,
    }))
  closePostModal = () => this.setState(() => ({
      open: false,
    }))

handleBodyChange = (e, value) => {
		e.preventDefault();
		this.setState({ body: e.target.value });
	}

handleCategoryChange = (e, i, value) => {
    this.setState({value})
  }

handleAuthorChange = (e, value) => {
    e.preventDefault();
    this.setState({ author: e.target.value });
    }

handleTitleChange = (e, value) => {
      e.preventDefault();
      this.setState({ title: e.target.value });
    }
onBackToMain = () => {
  this.props.getSelectedCategory("all")
  this.props.fetchPosts("all")
}

  submit = () => {
  const body = this.state.body;
  const id = getUUID();
  const timestamp = Date.now()
  const category = this.state.value;
  const author = this.state.author;
  const title = this.state.title;
  const post = {
       id,
       timestamp,
       category,
       author,
       title,
       body,
    }
    this.props.addPost(post)
    this.props.history.push(`/${post.category}`);
    this.setState({ body: '', title: '', author: ''})
    this.closePostModal();
  }

  render() {
    const { posts, error, loading} = this.props;
    const actions = [
      <TextField
        name="title"
        floatingLabelText="Title"
        value={this.state.title}
        onChange={this.handleTitleChange}
        fullWidth={false}
      />,
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
          onClick={this.closePostModal}
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

        <Categories />

        {this.props.match.params.category ?
          <FlatButton
            label="Back to Main"
            containerElement={<Link to="/"/>}
            onClick={() => this.onBackToMain()}
          /> : null }

        <FloatingActionButton onClick={this.openPostModal}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Make a Post"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closePostModal}
        >
          <DropDownMenu
            value={this.state.value} onChange={this.handleCategoryChange}
            autoWidth={true}
          >
            <MenuItem value={"react"} primaryText="React" />
            <MenuItem value={"redux"} primaryText="Redux" />
            <MenuItem value={"udacity"} primaryText="Udacity" />
          </DropDownMenu>
        </Dialog>
        <Sort posts={posts}/>
        {loading === true ? <div><Loading type='balls' color='#ff3647' className='loading' /></div> : null}
        {error !== undefined ? <div>{error}</div> : null}
          {!posts.length && !error
            ?
            <div className="noContentMsg">There are no posts in this category yet.</div>
            : posts.map((post, i) => (
                <div key={i}>
                    <PostPreview post={ post } key={i}/>
                </div>
            ))
          }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error,
  selectedCategory: state.categories.selectedCategory
});

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (selectedCategory) => dispatch(fetchPosts(selectedCategory)),
    addPost: (postObj) => dispatch(addPost(postObj)),
    getSpecificPost: (selectedPost) => dispatch(getSpecificPost(selectedPost)),
    getSelectedCategory: (selectedCategory) => dispatch(getSelectedCategory(selectedCategory)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts))
