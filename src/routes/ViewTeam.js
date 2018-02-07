import React from 'react';

import AppLayout from '../components/AppLayout';
import Teams from '../components/Teams';
import Channels from '../components/Channels';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';

export default () => (
  <AppLayout>
    <Teams teams={[{ id: 1, letter: 'B' }, { id: 2, letter: 'Q' }]} />
    <Channels
      teamName="Team name"
      username="Username"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
    />
    <Header channelName="general" />
    <Messages />
    <SendMessage channelName="general" />
  </AppLayout>
);
