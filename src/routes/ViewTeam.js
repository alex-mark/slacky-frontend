import React from 'react';

import AppLayout from '../components/AppLayout';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import Header from '../components/Header';
import Messages from '../components/Messages';
import Input from '../components/Input';

export default () => (
  <AppLayout>
    <Teams>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages />
    <Input>
      <input type="text" />
    </Input>
  </AppLayout>
);
