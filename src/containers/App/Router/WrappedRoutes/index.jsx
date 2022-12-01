import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../../../Layout/index';
import MailRocket from './MailRocket';

var checkAuth = () => {
  if (sessionStorage.getItem('userID') === null) {
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
    </div>
  </div>
);
