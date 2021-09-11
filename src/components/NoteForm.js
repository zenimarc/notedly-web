import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  height: 100%;
`;
const Form = styled.form`
  height: 100%;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`;

const NoteForm = props => {
  const [values, setValues] = useState({ content: props.content || '' });

  const onChangeHandler = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Wrapper>
      <Form
        onSubmit={event => {
          event.preventDefault();
          props.action({
            variables: { ...values }
          });
        }}
      >
        <TextArea
          type="text"
          name="content"
          required
          placeholder="Note Content"
          value={values.content}
          onChange={onChangeHandler}
        ></TextArea>
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

export default NoteForm;
