import React, { PureComponent } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import CloseCircleOutlineIcon from 'mdi-react/CloseCircleOutlineIcon';


import BossScoreView from './components/BossScoreView';

//import PlaceOrder from './components/PlaceOrder';
import { deleteCryptoTableData } from '../../../redux/actions/cryptoTableActions';
import { CryptoTableProps } from '../../../shared/prop-types/TablesProps';
import { ThemeProps, RTLProps } from '../../../shared/prop-types/ReducerProps';
import config from '../../../config/appConfig';
import axios from 'axios';
var winRateIndex = 0;
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
      levelBoss: 1,
      listBossScore: [],
    };
  }

  componentDidMount() {
    this.getBossScore();
  }

  getBossScore = async() => {
    let lsBossScore = [];
    await  
        axios
        .post(config.base_url + config.url_getBossScore, {
          userID: sessionStorage.getItem('userID'),
          BossScore: this.state.levelBoss,
        })
        .then(function(response) {
     //     console.log(response);
          if (response.status === 200) {
            let data = response.data;
            if (data.status === 'ok') {
              lsBossScore = data.data;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(() => {
          this.setState({
            listBossScore: lsBossScore.map((item) => {
              let user = {};
              user.UserId = item.UserId;
              user.DisplayName = item.PlayerData.DisplayName;
              user.Country = item.PlayerData.Country;
              user.Score = item.Score;
              return user;
            }),
            //lsPackageIAP: lsPackage,
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
  
  OnSearchClick = (e) => {
    if (e) e.preventDefault();
    this.getBossScore();
  }

  OnClearClick = (e) => {
    e.preventDefault();

    this.setState({
     levelBoss: 0,
    });
  };

  onChangeValue = (e) => {
    let data = [];
    data[e.target.name] = e.target.value;
    this.setState({levelBoss: e.target.value}, () => {
      this.OnSearchClick();
    });
  };

  OnkeyPress(e) {
    if (e.which === 13) {
      this.OnSearchClick(e);
    }
  }

  inCreaseLevelBoss = async() => {
    this.setState({levelBoss: this.state.levelBoss +1 }, () => {
    //  console.log(this.state.levelBoss)
      this.getBossScore()
    })
  }

  deCreaseLevelBoss = async() => {
    if(this.state.levelBoss) {
    this.setState({levelBoss: this.state.levelBoss -1 }, () => {
     // console.log(this.state.levelBoss)
      this.getBossScore()
    })
  }
  }
  render() {
    const levelBoss = 'Level: ' + this.state.levelBoss
    // var chartStage;
    // if (this.state.lsWinrate.length > 1)
    //   chartStage = <BtcEth data={this.state.lsWinrate} theme={theme.className} callback={this.onStageCallback} />;

    return (
      <Container className='dashboard'>
        <Row>
          <Col><h3 className='page-title'>Jackal Leaderboard</h3> </Col>
          <Container >
        <Col>
                  <div className='form__form-group-field'>
                        <div className='form__form-group-icon'>
                          <AccountOutlineIcon />
                        </div>
                        <input
                          name='level'
                          defaultvalue={this.state.levelBoss}
                          onKeyPress={this.OnkeyPress.bind(this)}
                          onChange={this.onChangeValue}
                          placeholder='level'
                        />
                      </div>
                    </Col>
                </Container>
          <Col md={10} x1={1}>
            <Container style={{ textAlign: 'center', display: 'inline_block' }}>
                <Button className='inlineBtn' 
                        onClick={() => this.deCreaseLevelBoss()}>
                  <p> Previous</p>
                </Button>
                <h4 
                    style={{ display: 'inline-block', fontWeight: 'bold' }}> 
                    {levelBoss} 
                </h4>
                <Button className='inlineBtn' onClick={() => this.inCreaseLevelBoss()}>
                  <p>
                    {'    '}
                    Next
                  </p>
                </Button>
                
              </Container>
          </Col>
        </Row>

        <Row>
          <BossScoreView title='Boss Score' lsCountryIAP={this.state.listBossScore} levelBoss={this.state.levelBoss} />
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
