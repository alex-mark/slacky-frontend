import React from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import { allTeamsQuery } from '../graphql/team';

const AddChannelModal = ({
  open,
  onClose,
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
    createChannel(name: $name, teamId: $teamId) {
      ok
      channel {
        id
        name
      }
    }
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    // Transform outer props into form values
    mapPropsToValues: () => ({ name: '' }),
    // Submission handler
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      await mutate({
        variables: { name: values.name, teamId },
        optimisticResponse: {
          createChannel: {
            __typename: 'Mutation',
            ok: true,
            channel: {
              __typename: 'Channel',
              id: -1,
              name: values.name,
            },
          },
        },
        update: (proxy, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          const data = proxy.readQuery({ query: allTeamsQuery });
          console.log(data);
          const teamIdx = data.allTeams.findIndex(t => t.id === teamId);
          data.allTeams[teamIdx].channels.push(channel);
          proxy.writeQuery({ query: allTeamsQuery, data });
        },
      });
      onClose();
      setSubmitting(false);
    },
  }),
)(AddChannelModal);
