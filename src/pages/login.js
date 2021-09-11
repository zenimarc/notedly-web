import { useApolloClient, useMutation, gql } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import UserForm from '../components/UserForm';
import { SIGN_IN } from '../gql/query';

const Login = props => {
  const client = useApolloClient();

  const history = useHistory();

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeData({ data: { isLoggedIn: true } });
      history.push(props.location.state.from || '/');
    }
  });

  useEffect(() => {
    document.title = 'Notedly - login';
  });

  return (
    <>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading...</p>}
      {error && <p>there was an error in loggin in</p>}
    </>
  );
};

export default Login;
