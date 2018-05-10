import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    })
      .then(() => {
        this.setState({ content: '' })
      })
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation addLyricToSong($songId: ID!, $content: String!) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics{
        id
        content
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate);