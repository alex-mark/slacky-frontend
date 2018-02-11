import React from 'react';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import Sidebar from '../containers/Sidebar';
import { allTeamsQuery } from '../graphql/team';

const ViewTeam = ({ data: { loading, allTeams }, match: { params: { teamId, channelId } } }) => {
  if (loading) {
    return null;
  }

  if (!allTeams.length) {
    return <Redirect to="/create-team" />
  }

  const teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? allTeams.findIndex(t => t.id === teamIdInteger) : 0;
  const team = allTeams[teamIdx];

  const channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger ? team.channels.findIndex(c => c.id === channelIdInteger) : 0;
  const channel = team.channels[channelIdx];

  return (
    <AppLayout>
      <Sidebar
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={team}
      />
      {channel && <Header channelName={channel.name} />}
      {channel && <Messages channelId={channel.id} />}
      {channel && <SendMessage channelName={channel.name} />}
    </AppLayout>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
