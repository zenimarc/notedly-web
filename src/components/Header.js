import React, { useState } from 'react';
import logo from '../img/logo.svg';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';
import { IS_LOGGED_IN } from '../gql/query';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = () => {
  const { data, client } = useQuery(IS_LOGGED_IN);

  const history = useHistory();

  const logoutHandler = async () => {
    // remove token from localStorage
    localStorage.removeItem('token');
    // reset Apollo cache (including the State -> isLoggedIn data stored in apollo cache)
    await client.resetStore().catch(e => {});
    // set new state in apollo cache
    client.writeData({ data: { isLoggedIn: false } });
    // redirect to home
    history.push('/');
  };

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink onClick={logoutHandler}>Logout</ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default Header;
