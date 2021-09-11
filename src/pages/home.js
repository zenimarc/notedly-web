import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

import Header from '../components/Header';
import Navigation from '../components/Navigation';

import { useQuery, gql } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import { GET_NOTES } from '../gql/query';

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  // if the data is successful, display the data in our UI
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {/* display load more button only if hasNextPage is true */}
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  //return the fetchMore result (new query result) but add to notes also previousResult notes
                  noteFeed: {
                    ...fetchMoreResult.noteFeed,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ]
                  }
                };
              }
            })
          }
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
