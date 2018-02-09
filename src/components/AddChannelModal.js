import React from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const AddChannelModal = ({
  open,
  onClose,
  teamId,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          fluid
          placeholder="Channel name"
        />
        <Form.Group widths="equal">
          <Button disabled={isSubmitting} onClick={onClose} fluid>
            Cancel
          </Button>
          <Button disabled={isSubmitting} onClick={handleSubmit} fluid>
            Create channel
          </Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
  mutation($name: String!, $teamId: Int!) {
    createChannel(name: $name, teamId: $teamId)
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    // Transform outer props into form values
    mapPropsToValues: () => ({ name: '' }),
    // Submission handler
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      console.log(teamId)
      await mutate({ variables: { name: values.name, teamId } });
      onClose();
      setSubmitting(false);
    },
  }),
)(AddChannelModal);
