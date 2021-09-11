import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  useEffect(() => {
    document.title = 'your favorites - Notedly';
  });

  const { data, loading, error } = useQuery(GET_MY_FAVORITES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>There was an error retrieving your favorite notes</p>;
  if (data.me.favorites.length === 0) return <p>no notes yet</p>;
  return <NoteFeed notes={data.me.favorites} />;
};

export default Favorites;
