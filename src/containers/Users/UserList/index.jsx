import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProductsListTable from './components/ProductsListTable';

const ProductsList = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">User Manager</h3>
        <h3 className="page-subhead subhead">User Funtion
        </h3>
      </Col>
    </Row>
    <Row>
      <ProductsListTable />
    </Row>
  </Container>
);

export default ProductsList;
