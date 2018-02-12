import React from 'react';
import { withFormik } from 'formik';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const ENTER_CODE = 13;

const SendMessage = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <SendMessageWrapper>
    <Input
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_CODE && !isSubmitting) {
          handleSubmit(e);
        }
      }}
      name="message"
      value={values.message}
      onBlur={handleBlur}
      onChange={handleChange}
      fluid
      placeholder={`Message #${channelName}`}
    />
  </SendMessageWrapper>
);

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (values, { props: { channelId, mutate }, setSubmitting, resetForm }) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false);
        return;
      }

      await mutate({
        variables: { channelId, text: values.message },
      });
      resetForm(false);
    },
  }),
)(SendMessage);
