import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes, { number } from 'prop-types';

import PVPRemoteConfig from './components/PVPRemoteConfig';

//import PlaceOrder from './components/PlaceOrder';
import { deleteCryptoTableData } from '../../redux/actions/cryptoTableActions';
import { CryptoTableProps } from '../../shared/prop-types/TablesProps';
import { ThemeProps, RTLProps } from '../../shared/prop-types/ReducerProps';
import axios from 'axios';

import config from '../../config/appConfig';
import setAuthHeader from '../../shared/components/auth/authJwt';

class CryptoDashboard extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    cryptoTable: CryptoTableProps.isRequired,
    dispatch: PropTypes.func.isRequired,
    rtl: RTLProps.isRequired,
    theme: ThemeProps.isRequired,
  };

  constructor() {
    super();
    this.state = {
      timePlay: null,
      leaderboard: null
    };
  }
  componentDidMount() {
    var data = null;
    setAuthHeader();
    axios
      .get(config.product_url + config.prefix_pvp + config.url_config)
      .then(function(response) {
        if (response.status === 200) {
          data = response.data;
          console.log(data)
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(() => {
        if(data) {
          this.setState({
            timePlay: data.TimePlay,
            leaderboard: data.Leaderboard
          });
        }
      });
  }

  render() {

    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Remote Config PVP</h3>
          </Col>
        </Row>

        <Row>
          <PVPRemoteConfig title='PVP' timePlay={this.state.timePlay}  leaderboard={this.state.leaderboard}/>
  
        </Row>
      </Container>
    );
  }
}

export default connect((state) => ({
  cryptoTable: state.cryptoTable.items,
  rtl: state.rtl,
  theme: state.theme,
}))(withTranslation('common')(CryptoDashboard));
