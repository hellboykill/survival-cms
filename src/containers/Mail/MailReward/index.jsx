import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import MailReward from './components/MailReward';

const MailRewardForm = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">
          Mail
        </h3>
        <h3 className="page-subhead subhead">
          Add Mail Reward
        </h3>
      </Col>
    </Row>
    <Row>
      <MailReward/>
    </Row>
  </Container>
);

MailRewardForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(MailRewardForm);
