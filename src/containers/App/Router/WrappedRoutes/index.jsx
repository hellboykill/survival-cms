import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../../../Layout/index';
import MailRocket from './MailRocket';
import PVPMode from './PVPMode';
var checkAuth = () => {
  if (sessionStorage.getItem('accessToken') === null) {
    console.log('login redirect ');
    return <Redirect to='/log_in' />;
  }
};
export default () => (
  <div>
    <Layout />
    {checkAuth()}
    <div className='container__wrap'>
      <Route path='/mail' component={MailRocket} />
      <Route path='/pvp' component={PVPMode} />
    </div>
  </div>
);
