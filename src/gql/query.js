import { gql } from '@apollo/client';

export const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      content
      author {
        username
        id
      }
      favoritedBy {
        username
        id
      }
      favoriteCount
      createdAt
    }
  }
`;

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
      cursor
      hasNextPage
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($username: String, $password: String!, $email: String) {
    signIn(username: $username, password: $password, email: $email)
  }
`;

export const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signup($username: String!, $password: String!, $email: String!) {
    signUp(username: $username, password: $password, email: $email)
  }
`;

export const GET_MY_FAVORITES = gql`
  query getMyNote {
    me {
      id
      favorites {
        id
        content
        author {
          username
          avatar
          id
        }
        favoriteCount
        createdAt
      }
    }
  }
`;

export const GET_MY_NOTES = gql`
  query getMyFav {
    me {
      id
      notes {
        id
        content
        author {
          username
          avatar
          id
        }
        favoriteCount
        createdAt
      }
    }
  }
`;

export const GET_ME = gql`
  query getMe {
    me {
      id
      favorites {
        id
      }
    }
  }
`;
