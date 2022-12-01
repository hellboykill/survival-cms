import React from "react";
import { Col, Container, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import MailNotifyVersion from "./components/MailNotifyVersion";

const MailSystemUpdateForm = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Mail</h3>
        <h3 className="page-subhead subhead">
          Add Mail Notify For Update New Version
        </h3>
      </Col>
    </Row>
    <Row>
      <MailNotifyVersion />
    </Row>
  </Container>
);

MailSystemUpdateForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(MailSystemUpdateForm);
