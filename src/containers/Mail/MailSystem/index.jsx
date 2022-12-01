import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import MailSystem from './components/MailSytem';

const MailSystemForm = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">
          Mail
        </h3>
        <h3 className="page-subhead subhead">
          Add Mail System
        </h3>
      </Col>
    </Row>
    <Row>
      <MailSystem/>
    </Row>
  </Container>
);

MailSystemForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(MailSystemForm);
