import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { GET_ME } from '../gql/query';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';

const NoteUser = ({ note }) => {
  const { data, loading, error } = useQuery(GET_ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>cannot edit this note now, try again later</p>;

  return (
    <>
      <FavoriteNote
        noteId={note.id}
        me={data.me}
        favoriteCount={note.favoriteCount}
      />
      {data.me.id === note.author.id && (
        <>
          <br />
          <Link to={`edit/${note.id}`}>Edit</Link>
          <br />
          <DeleteNote noteId={note.id} />
        </>
      )}
    </>
  );
};

export default NoteUser;
