import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MailSystem from '../../../Mail/MailSystem';
import MailNotifyVersion from '../../../Mail/MailNotifyVersion';
import MailReward from '../../../Mail/MailReward';

export default () => (
  <Switch>
    <Route exact path='/mail/system' component={MailSystem} />
    <Route exact path='/mail/notify-update' component={MailNotifyVersion} />
    <Route exact path='/mail/reward' component={MailReward} />
  </Switch>
);
