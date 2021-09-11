import { gql } from '@apollo/client';

export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
      createdAt
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation favoriteNote($id: ID!) {
    toggleFavorite(id: $id) {
      favoriteCount
    }
  }
`;
