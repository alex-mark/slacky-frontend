import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListHeader = styled.li`
  ${paddingLeft};
`;
const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const PushRight = styled.div`
  ${paddingLeft};
`;

const channel = ({ id, name }, teamId) => (
  <Link to={`/view-team/${teamId}/${id}`} key={`channel-${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const user = ({ id, username }, teamId) => (
  <Link to={`/view-team/user/${teamId}/${id}`} key={`user-${id}`}>
    <SideBarListItem>
      <Bubble /> {username}
    </SideBarListItem>
  </Link>
);

export default ({
  teamName,
  username,
  channels,
  users,
  teamId,
  isOwner,
  onAddChannelClick,
  onInvitePeopleClick,
  onDirectMessageClick,
}) => (
  <ChannelWrapper>
    <PushRight>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushRight>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Channels {isOwner && <Icon onClick={onAddChannelClick} name="add circle" />}
        </SideBarListHeader>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>
          Direct messages <Icon onClick={onDirectMessageClick} name="add circle" />
        </SideBarListHeader>
        {users.map(u => user(u, teamId))}
      </SideBarList>
    </div>

    {isOwner && (
      <div>
        <a href="#invite-people" onClick={onInvitePeopleClick}>
          + Invite People
        </a>
      </div>
    )}
  </ChannelWrapper>
);
