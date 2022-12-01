import React from "react";
import { Col, Container, Row } from "reactstrap";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import GiftCodeForm from "./components/GiftCodeForm";
//import VerticalFormWithIcons from './components/VerticalFormWithIcons';
import RewardItems from "./components/RewardItems";

import VerticalFormHalf from "./components/VerticalFormHalf";
import showResults from "../Form/Show";
import config from "../../config/appConfig";
const axios = require("axios");

function submitViewUser(values) {
  console.log("submitViewUser", values);

  var Rewards = "";
  if (values.Rewards) Rewards = values.Rewards.trim();

  var Amount = 1;
  if (values.Amount) Amount = values.Amount.trim();

  var Desc = "";
  if (values.Desc) Desc = values.Desc.trim();
  console.log(values)
  // if (Rewards !== "") {
  //   axios
  //     .post(config.base_url_game + config.url_CreateGiftCode, {
  //       GiftCode: "",
  //       Amount: Amount,
  //       Rewards: Rewards,
  //       Desc: Desc,
  //       Creator: "admin",
  //     })
  //     .then(function(response) {
  //       console.log(response);
  //       if (response.status === 200) {
  //         let data = response.data;
  //         console.log("data", data);
  //         if (data.status === "ok") {
  //           window.alert(`Create Giftcode Done: ` + data.data.GiftCode);
  //         }
  //       }
  //     });
  // }
}

function CopyDataUser(values) {
  axios
    .get(
      `http://113.190.253.188:8080/user/cloneData?fromID=${values.userFrom}&toID=${values.userTo}`
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
        <h3 className="page-title">Gift Code</h3>
        <h3 className="page-subhead subhead">User Form for create gift code</h3>
      </Col>
    </Row>
    <Row>
      {/* <HorizontalForm onSubmit={showResults} /> */}
      {/* <HorizontalFormWithIcons onSubmit={submitViewUser} /> */}
      <GiftCodeForm onSubmit={submitViewUser} />
      {/* onSubmit={CopyDataUser} */}
      {/* <VerticalFormHalf onSubmit={showResults} /> */}
    </Row>
    <Row>
      {" "}
      <RewardItems />
    </Row>
  </Container>
);

FormLayouts.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FormLayouts);
