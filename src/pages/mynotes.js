import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Notes - Notedly';
  });

  const { data, loading, error } = useQuery(GET_MY_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error retrieving your notes</p>;
  if (data.me.notes.length === 0) return <p>no notes yet</p>;
  return <NoteFeed notes={data.me.notes} />;
};

export default MyNotes;
