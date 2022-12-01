import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import HorizontalForm from './components/HorizontalForm';
import HorizontalFormWithIcons from './components/HorizontalFormWithIcons';
import VerticalForm from './components/VerticalForm';
import VerticalFormWithIcons from './components/VerticalFormWithIcons';
import VerticalFormHalf from './components/VerticalFormHalf';
import showResults from '../../Form/Show';

import config from '../../../config/appConfig';

const axios = require('axios');

function submitViewUser(values) {
  // print the form values to the console
  // axios
  //   .get(
  //     'http://113.190.253.188:8080/user/getUserData?userID=5e7ed4bbce400426e46b411a'
  //   )
  //   .then(function(response) {
  //     // handle success
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     // handle error
  //     console.log(error);
  //   });
  window.open(
      config.cms_url + `/user/getUserData?userID=` +values.userID,
    '_blank'
  );

  console.log(values);
}

function CopyDataUser(values) {

  axios
    .get(
      config.cms_url + `/user/cloneData?fromID=${values.userFrom}&toID=${values.userTo}`
    )
    .then(function(response) {
      // handle success
      window.alert(`Copy Data Done`);
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });


 
}

const FormLayouts = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">{t('forms.form_layouts.title')}</h3>
        <h3 className="page-subhead subhead">
          Use this elements, if you want to show some hints or additional
          information
        </h3>
      </Col>
    </Row>
    <Row>
      {/* <HorizontalForm onSubmit={showResults} /> */}
      {/* <HorizontalFormWithIcons onSubmit={submitViewUser} /> */}
      <VerticalForm onSubmit={submitViewUser} />
      <VerticalFormWithIcons onSubmit={CopyDataUser} />
      <VerticalFormHalf onSubmit={showResults} />
    </Row>
  </Container>
);

FormLayouts.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(FormLayouts);
