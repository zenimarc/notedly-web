import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const UserForm = props => {
  const [values, setValues] = useState();

  const onChangeHandler = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Wrapper>
      {props.formType === 'signup' ? <h2>SignUp</h2> : <h2>Login</h2>}
      <Form
        onSubmit={event => {
          event.preventDefault();
          props.action({
            variables: {
              ...values
            }
          });
        }}
      >
        {props.formType === 'signup' && (
          <>
            <label htmlFor="username">Username:</label>
            <input
              required
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={onChangeHandler}
            />
          </>
        )}

        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChangeHandler}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={onChangeHandler}
        />
        <button type="submit">Submit</button>
      </Form>
    </Wrapper>
  );
};

export default UserForm;
