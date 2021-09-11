import React, { useContext, useEffect, useState } from 'react';

import { useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { useHistory } from 'react-router-dom';
import {
  GET_MY_FAVORITES,
  GET_MY_NOTES,
  GET_NOTES,
  NEW_NOTE
} from '../gql/query';

const NewNotePage = props => {
  useEffect(() => {
    document.title = 'New Note - Notedly';
  });

  const history = useHistory();

  const [newNote, { loading, error }] = useMutation(NEW_NOTE, {
    onCompleted: data => {
      history.push(`/note/${data.newNote.id}`);
    },
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }]
  });

  if (loading) return 'Loading...';

  if (error) return 'there was an error creating the note';

  return <NoteForm action={newNote} />;
};

export default NewNotePage;
