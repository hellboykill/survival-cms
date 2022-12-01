import React, { PureComponent } from "react";
import { Col, Container, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CCU from "./components/CCU";
import DAU from "./components/DAU";
import NRU from "./components/NRU";
import PU from "./components/PU";
import TradeHistory from "./components/TradeHistory";
import BtcEth from "./components/BtcEth";
import TopUserIAP from "./components/TopUserIAP";
import CryptotrendsToday from "./components/CryptotrendsToday";
import TopTen from "./components/TopTen";
//import PlaceOrder from './components/PlaceOrder';
import { deleteCryptoTableData } from "../../../redux/actions/cryptoTableActions";
import { CryptoTableProps } from "../../../shared/prop-types/TablesProps";
import { ThemeProps, RTLProps } from "../../../shared/prop-types/ReducerProps";
import config from "../../../config/appConfig";
import axios from "axios";
import { ContinuousColorLegend } from "react-vis";

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
      ccu: 0,
      nru: 0,
      dau: 0,
      pu: 0,
      totalIAP: 0,
      lsIAPCountry: [],
      lsIAPPackage: [],
      lsIAPUser: [],
      lsWinrate: [{ name: "Stage_1", Win: 0, Lose: 0, Total: 0 }],
    };
  }

  componentDidMount() {
    var dashboardResult;
    var lsIAP = [];
    var lsCountry = [];
    var lsPackage = [];
    var lsRate = [];
    var lsIAPUser = [];
    var totalIAP = 0;
    var dicNationIAP = {};
    var dicPackageIAP = {};
    var dicUserIAP = {};

    axios
      .post(config.base_url + config.url_gameStats, {
        userID: sessionStorage.getItem("userID"),
      })
      .then(function(response) {
        console.log(response.data.data);
        if (response.status === 200) {
          let data = response.data;
          if (data.status === "ok") {
            dashboardResult = data.data;
            console.log("statsData", dashboardResult);
            lsIAP = dashboardResult.IAP;
            lsIAP.forEach((item) => {
              let country = item.Currency === "" ? "Unknow" : item.Currency;
              if (dicNationIAP.hasOwnProperty(country)) {
                dicNationIAP[country].count = dicNationIAP[country].count + 1;
                dicNationIAP[country].total =
                  dicNationIAP[country].total + item.PriceUSD * 1.43;
              } else {
                dicNationIAP[country] = { count: 1, total: item.PriceUSD };
              }

              let pack = item.ProductId;
              if (dicPackageIAP.hasOwnProperty(pack)) {
                dicPackageIAP[pack].count = dicPackageIAP[pack].count + 1;
                dicPackageIAP[pack].total =
                  dicPackageIAP[pack].total + item.PriceUSD * 1.43;
              } else {
                dicPackageIAP[pack] = { count: 1, total: item.PriceUSD * 1.43 };
              }
              let userID = item.User;
              if (dicUserIAP.hasOwnProperty(userID)) {
                dicUserIAP[userID].total =
                  dicUserIAP[userID].total + item.PriceUSD * 1.43;
              } else {
                dicUserIAP[userID] = {
                  country: item.Currency,
                  total: item.PriceUSD * 1.43,
                };
              }
              totalIAP += item.PriceUSD * 1.43;
            });
            // get key packge shorter
            let newKeyPackage = [];
            let oldkeyPackage = Object.keys(dicPackageIAP);
            for (let i = 0; i < oldkeyPackage.length; i++) {
              newKeyPackage.push(oldkeyPackage[i].split(".")[3]);
            }
            for (let i = 0; i < oldkeyPackage.length; i++) {
              delete Object.assign(dicPackageIAP, {
                [newKeyPackage[i]]: dicPackageIAP[oldkeyPackage[i]],
              })[oldkeyPackage[i]];
            }
            var lsCountryName = Object.keys(dicNationIAP);
            lsCountry = lsCountryName
              .map((item) => {
                var data = {};
                data.name = item;
                data.count = dicNationIAP[item].count;
                data.total = dicNationIAP[item].total;
                return data;
              })
              .sort((a, b) => b.total - a.total);

            lsPackage = Object.keys(dicPackageIAP)
              .map((item) => {
                var data = {};
                data.name = item;
                data.count = dicPackageIAP[item].count;
                data.total = dicPackageIAP[item].total;
                return data;
              })
              .sort((a, b) => b.total - a.total);

            lsIAPUser = Object.keys(dicUserIAP)
              .map((item) => {
                var dataUser = {};
                dataUser.userID = item;
                dataUser.country = dicUserIAP[item].country;
                dataUser.total = dicUserIAP[item].total.toFixed(4);
                return dataUser;
              })
              .sort((a, b) => b.total - a.total);

            lsIAPUser = lsIAPUser.slice(0, 10);
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(() => {

        let [CCU, DAU, PU, NRU] = [0 , 0, 0];

        if(dashboardResult) {
          CCU = dashboardResult.CCU;
          DAU = dashboardResult.DAU[dashboardResult.DAU.length -1];
          PU = dashboardResult.PU[dashboardResult.PU.length -1];
          NRU = dashboardResult.NRU[dashboardResult.NRU.length -1];
        }

        const lsUserID = lsIAPUser.map((index) => {
          return index.userID;
        });
        axios
          .post(config.base_url + config.url_getTopIAP, {
            lsUserID: lsUserID,
          })
          .then(async (rsIAP) => {
            for await(const index of rsIAP.data.data) {
              if (index.LTVInApp) {
                for await (const user of lsIAPUser) {
                  if (user.userID == index._id) {
                    user.totalIAP = index.LTVInApp.toFixed(4);
                    break;
                  }
                }
              }
            };
            this.setState({
              ccu: CCU,
              dau: DAU,
              nru: NRU,
              pu: PU,
              totalIAP: Math.round(totalIAP),
              lsCountryIAP: lsCountry,
              lsPackageIAP: lsPackage,
              lsIAPUser: lsIAPUser,
            });
          })
          .catch((errDt) => console.log(errDt));

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
    const { t, cryptoTable, rtl, theme } = this.props;

    var chartStage;
    if (this.state.lsWinrate.length > 1)
      chartStage = (
        <BtcEth
          data={this.state.lsWinrate}
          theme={theme.className}
          callback={this.onStageCallback}
        />
      );

    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">{t("dashboard_crypto.page_title")}</h3>
          </Col>
        </Row>
        <Row>
          <CCU ccu={this.state.ccu} />
          <DAU dau={this.state.dau} />
          <NRU nru={this.state.nru} />
          <PU pu={this.state.pu} />
        </Row>
        <Row>
          <CryptotrendsToday
            total={this.state.totalIAP}
            lsCountryIAP={
              this.state.lsCountryIAP ? this.state.lsCountryIAP : []
            }
          />
          <TradeHistory
            title="IAP by Country"
            lsCountryIAP={this.state.lsCountryIAP}
          />
          <TradeHistory
            title="IAP by Package"
            lsCountryIAP={this.state.lsPackageIAP}
          />
          <TopUserIAP lsUserIAP={this.state.lsIAPUser} />
          {chartStage}
        </Row>
      </Container>
    );
  }
}

export default connect((state) => ({
  cryptoTable: state.cryptoTable.items,
  rtl: state.rtl,
  theme: state.theme,
}))(withTranslation("common")(CryptoDashboard));
