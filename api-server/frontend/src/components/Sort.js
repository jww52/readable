import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { setSortedPosts, setSortedComments } from '../actions'

class Sort extends Component {

onChangeSort(e){

  const { posts } = this.props
  const { comments } = this.props

  if (e.target.value === 'voteScore') {
    function compareVote(a, b) {
          const scoreA = a.voteScore;
          const scoreB = b.voteScore;

          let comparison = 0;
            if (scoreA > scoreB) {
              comparison = -1;
            } else if (scoreA < scoreB) {
              comparison = 1;
            }
          return comparison;
        }

    if (posts) {
      const sortedVoteScorePosts = posts.slice().sort(compareVote);
      this.props.setSortedPosts(sortedVoteScorePosts)
    }

    if (comments) {
      const sortedVotescoreComments = comments.slice().sort(compareVote)
      this.props.setSortedComments(sortedVotescoreComments)
    }
  }

  if (e.target.value === 'timestamp') {

    function compareTime(a, b) {
        const timeA = a.timestamp;
        const timeB = b.timestamp;

        let comparison = 0;
            if (timeA > timeB) {
              comparison = -1;
            } else if (timeA < timeB) {
              comparison = 1;
            }
          return comparison;
        }

      if (posts) {
        const sortedTimestampPosts = posts.slice().sort(compareTime);
        this.props.setSortedPosts(sortedTimestampPosts)
      }

      if (comments) {
        const sortedTimestampComments = comments.slice().sort(compareTime)
        this.props.setSortedComments(sortedTimestampComments)
      }
    }
  }

  render() {
    const styles = {
      block: {
        maxWidth: 250,
      },
      radioButton: {
        marginBottom: 16,
      },
    };
      return (
          <div>
            <h3>Sort By:</h3>
            <RadioButtonGroup
              name="listResults"
              defaultSelected="none"
              onChange={(e) => (this.onChangeSort(e))}
            >
              <RadioButton
                value="voteScore"
                label="Vote Score"
                style={styles.radioButton}
              />
              <RadioButton
                value="timestamp"
                label="Time Created"
                style={styles.radioButton}
              />
              </RadioButtonGroup>

        </div>
      )
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      setSortedPosts: (posts) => dispatch(setSortedPosts(posts)),
      setSortedComments: (comments) => dispatch(setSortedComments(comments)),
    }
  }

  export default withRouter(connect(
    null,
    mapDispatchToProps
  )(Sort))
