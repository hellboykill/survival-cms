import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ListHackTable from './components/ListUserHack';

const ProductsList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">User Hack Manager</h3>
        <h3 className="page-subhead subhead">Danh Sách Người Chơi Nghi Ngờ Hack
        </h3>
      </Col>
    </Row>
    <Row>
      <ListHackTable />
    </Row>
  </Container>
);

export default ProductsList;
