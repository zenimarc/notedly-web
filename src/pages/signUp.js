import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import UserForm from '../components/UserForm';
import { SIGNUP_USER } from '../gql/query';

const SignUp = props => {
  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

  const history = useHistory();

  const client = useApolloClient();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      client.writeData({ data: { isLoggedIn: true } });
      history.push('/');
    }
  });

  return (
    <>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && (
        <p>there was an error creating your account: {error.message}</p>
      )}
    </>
  );
};

export default SignUp;
