import React, { Component } from 'react';
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import ContentClear from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import { deleteComment, editComment, commentVote } from '../actions'


class CommentsDetail extends Component {
  state = {
    openEditCommentModal: false,
    editBody: '',
    commentEditToggle: false,
  }

openEditCommentModal = () => this.setState(() => ({
  openEditCommentModal: true,
 }))

closeEditCommentModal = () => this.setState({
    openEditCommentModal: false,
  })

onDelete = (commentId) => {
    this.props.deleteComment(commentId)
  }

  onVoteUp = (e, c) => {
    e.preventDefault();
    const {id} = c
    this.props.commentVote(id, "upVote");
  }

  onVoteDown = (e, c) => {
    e.preventDefault();
    const {id} = c
    this.props.commentVote(id, "downVote");
  }


handleCommentBodyEdit = (e, value) => {
  		e.preventDefault();
  		this.setState({ commentEditToggle: true, editBody: e.target.value });
  	}

    submitCommentEdit = (c) => {
      const body = this.state.commentEditToggle? this.state.editBody : c.body;
      const id = c.id
      const timestamp = Date.now()
      const updatedComment = {
        id,
        body,
        timestamp,
      }
      this.props.editComment(updatedComment)
      this.closeEditCommentModal();
    }


render() {
  const {c} = this.props
  const editCommentActions = [
    <TextField
      name="author"
      floatingLabelText="Author"
      disabled={true}
      value={c.author}
      fullWidth={false}
    />,
      <TextField
        name="editBody"
        floatingLabelText="Comment Body"
        defaultValue={c.body}
        onChange={this.handleCommentBodyEdit}
        fullWidth={true}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeEditCommentModal}
      />,
      <FlatButton
        label="Submit"
        type="submit"
        primary={true}
        onClick={() => this.submitCommentEdit(c)}
      />,
    ];

return (
  <div>
    <Card
      expanded={true}
      >
      <CardTitle actAsExpander={true} subtitle={`by ${c.author}`} />
        <CardHeader title={`Votes: ${c.voteScore}`}
        actAsExpander={true}
        showExpandableButton={false}
      />
      <CardText expanded='true'>
        {c.body}
      </CardText>
      <CardActions>
      <FloatingActionButton secondary={true} onClick={() => this.onDelete(c.id) }>
        <ContentClear />
      </FloatingActionButton>
      <FlatButton
        label="Vote Up"
        onClick={(e) => this.onVoteUp(e, c)}
      />
      <FlatButton
        label="Vote Down"
        onClick={(e) => this.onVoteDown(e, c)}
      />
      <FlatButton
        label="Edit Comment"
        onClick={() => {this.openEditCommentModal()}}
      />
      <Dialog
        title="Edit Comment"
        actions={editCommentActions}
        modal={false}
        open={this.state.openEditCommentModal}
        onRequestClose={this.closeEditCommentModal}
      >
      </Dialog>
    </CardActions>
    </Card>
  </div>
  )
}
}

const mapStateToProps = (state, ownProps) => ({
  c: ownProps.comment
});

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    editComment: (updatedComment) => dispatch(editComment(updatedComment)),
    commentVote: (commentID, string) => dispatch(commentVote(commentID, string)),
  }
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(CommentsDetail);
