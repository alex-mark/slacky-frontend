import React from 'react';
import { withFormik } from 'formik';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const ENTER_CODE = 13;

const SendMessage = ({
  placeholder,
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
      placeholder={`Message #${placeholder}`}
    />
  </SendMessageWrapper>
);

export default withFormik({
  mapPropsToValues: () => ({ message: '' }),
  handleSubmit: async (values, { props: { onSubmit }, setSubmitting, resetForm }) => {
    if (!values.message || !values.message.trim()) {
      setSubmitting(false);
      return;
    }

    await onSubmit(values.message);
    resetForm(false);
  },
})(SendMessage);
