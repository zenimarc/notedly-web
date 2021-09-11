import { useMutation } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DELETE_NOTE } from '../gql/mutations';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
import ButtonAsLink from './ButtonAsLink';

const DeleteNote = ({ noteId }) => {
  const [deleteNote, { loading, error }] = useMutation(DELETE_NOTE, {
    variables: {
      id: noteId
    },
    onCompleted: data => {
      history.push(`/mynotes`);
    },
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }]
  });
  const history = useHistory();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>you can't delete this not now, retry later</p>;
  return <ButtonAsLink onClick={deleteNote}>Delete</ButtonAsLink>;
};

export default DeleteNote;
