import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PVPView from './components/PVPView';

//import PlaceOrder from './components/PlaceOrder';
import { deleteCryptoTableData } from '../../../redux/actions/cryptoTableActions';
import { CryptoTableProps } from '../../../shared/prop-types/TablesProps';
import { ThemeProps, RTLProps } from '../../../shared/prop-types/ReducerProps';
import config from '../../../config/appConfig';
import axios from 'axios';
import setAuthHeader from '../../../shared/components/auth/authJwt';

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
      listPVP: [],
    };
  }
  componentDidMount() {
    setAuthHeader();
    var lsPVP = [];
    axios
      .get(config.server_url + config.prefix_pvp + config.url_leaderboard)
      .then(function(response) {
        if (response.status === 200) {
          lsPVP = response.data;
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(() => {
        this.setState({
            listPVP: lsPVP.map((item) => {
            let user = {};
            user.UserId = item.UserId;
            user.DisplayName = item.PlayerData.DisplayName;
            user.Score = item.Score;
            return user;
          }),
        });
      });
  }

  onDeleteCryptoTableData = (index, e) => {
    const { dispatch, cryptoTable } = this.props;
    e.preventDefault();
    const arrayCopy = [...cryptoTable];
    arrayCopy.splice(index, 1);
    dispatch(deleteCryptoTableData(arrayCopy));
  };

  render() {

    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Jackal Survival Leaderboard</h3>
          </Col>
        </Row>

        <Row>
          <PVPView title='PVP' lsPVP={this.state.listPVP} />
  
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
