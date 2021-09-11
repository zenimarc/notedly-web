import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import { UPDATE_NOTE } from '../gql/mutations';
import { GET_ME, GET_NOTE } from '../gql/query';

const updateNotePage = props => {
  const id = props.match.params.id;
  const history = useHistory();

  const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });

  const { data: userdata } = useQuery(GET_ME);

  const [updateNote] = useMutation(UPDATE_NOTE, {
    variables: {
      id
    },
    onCompleted: data => {
      history.push(`/note/${id}`);
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error updating the note</p>;

  if (userdata.me.id !== data.note.author.id) {
    return <p>You can't edit others note</p>;
  }

  return <NoteForm content={data.note.content} action={updateNote} />;
};

export default updateNotePage;
