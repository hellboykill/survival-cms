import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PVP from '../../../Dashboards/PVP';
import PVPRemoteConfig from '../../../RemoteConfig';
export default () => (
  <Switch>
    <Route exact path='/pvp/leaderboard' component={PVP} />
    <Route exact path='/pvp/remoteconfig' component={PVPRemoteConfig} />

  </Switch>
);
