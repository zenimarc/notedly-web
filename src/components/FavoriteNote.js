import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TOGGLE_FAVORITE } from '../gql/mutations';
import { GET_MY_FAVORITES } from '../gql/query';
import ButtonAsLink from './ButtonAsLink';

const FavoriteNote = ({ noteId, me, favoriteCount }) => {
  const [count, setCount] = useState(favoriteCount);
  const [favorite, setFavorite] = useState(
    me.favorites.filter(note => note.id === noteId).length > 0
  );
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: noteId
    },
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });
  return (
    <>
      Favorite count: {count} <br />
      {!favorite ? (
        <ButtonAsLink
          onClick={() => {
            setFavorite(true);
            setCount(count + 1);
            toggleFavorite();
          }}
        >
          add to fav
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            setFavorite(false);
            setCount(count - 1);
            toggleFavorite();
          }}
        >
          remove fav
        </ButtonAsLink>
      )}
    </>
  );
};

export default FavoriteNote;
