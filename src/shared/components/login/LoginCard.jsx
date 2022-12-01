import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link, Router, withRouter } from 'react-router-dom';
import Loading from '../Loading';
import LogInForm from './LogInForm';

const LoginCard = () => {
  // if (loading) {
  //   return <Loading />;
  // }
  
  return (
    <div className='account__wrapper'>
      <div className='account__card'>
        <div className='account__head'>
          <h3 className='account__title'>
            Jackal
            <span className='account__logo'>
              {' '}
              Survival <span className='account__logo-accent'> IO</span>
            </span>
          </h3>
          <h4 className='account__subhead subhead'>Staff Only</h4>
        </div>
        <LogInForm onSubmin form='log_in_form' />
        {/* <div className="account__or">
          <p>Or Easily Using</p>
        </div>
        <div className="account__social">
          <Button
            className="account__social-btn account__social-btn--firebase"
            onClick={() => console.log('click Login')}
          >
            <FirebaseIcon />
          </Button>
          <Button
            className="account__social-btn account__social-btn--auth0"
            onClick={() => console.log('click Login')}
          >
            <img className="customizer__btn-icon" src={auth0Icon} alt="icon" />
          </Button>
        </div>
      */}
      </div>
    </div>
  );
};

LoginCard.propTypes = {
  changeIsOpenModalFireBase: PropTypes.func.isRequired,
};

export default withRouter(LoginCard);
