import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
  renderSongs() {
    return this.props.data.songs.map(song => {
      return (
        <li className="collection-item" key={song.id}>
          {song.title}
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <h1>Loading</h1>;
    }
    if (this.props.data.error) {
      console.log(this.props.data.error);
      return <h1>An unexpected error occurred</h1>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(query)(SongList);
