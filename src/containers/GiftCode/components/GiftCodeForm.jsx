import React, { PureComponent } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import renderDateTimePickerField from "./../../../shared/components/form/DateTimePicker";
import TimetableIcon from "mdi-react/TimetableIcon";
import axios from "axios";
import config from "./../../../config/appConfig";

import EyeIcon from "mdi-react/EyeIcon";
const renderField = ({
  input,
  placeholder,
  type,
  meta: { touched, error },
}) => (
  <div className="form__form-group-input-wrap">
    <input {...input} placeholder={placeholder} type={type} />
    {touched && error && (
      <span className="form__form-group-error">{error}</span>
    )}
  </div>
);
renderField.propTypes = {
  input: PropTypes.shape().isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

renderField.defaultProps = {
  placeholder: "",
  meta: null,
  type: "text",
};

class GiftCodeForm extends PureComponent {
  // static propTypes = {
  //   t: PropTypes.func.isRequired,
  //   handleSubmit: PropTypes.func.isRequired,
  //   reset: PropTypes.func.isRequired,
  // };

  constructor(props) {
    super(props);
    this.OnSubmitCLick = this.OnSubmitCLick.bind(this);
    this.state = {
      showPassword: false,
      GiftCode: null,
      gifts: {},
      amount: 1,
      endDate: null,
    };
  }

  componentDidMount() {
    this.setState({
      GiftCode: this.randomStringGiftcode(),
    });
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  OnRefreshGiftCode = (e) => {
    e.preventDefault();
    this.setState({ GiftCode: this.randomStringGiftcode() });
  };

  OnSubmitCLick(values) {
    // handle data after pass validate
    window.alert(`You submitted Local :\n\n${JSON.stringify(values, null, 2)}`);
  }

  handleEndDateChange(event) {
    this.setState({
      endDate: event,
    });
  }

  handleChangeName(event) {
    this.setState({
      GiftCode: event.target.value,
    });
  }

  handleChangeAmount(event) {
    this.setState({
      amount: +event.target.value,
    });
  }

  handleGiftChange(event) {
    let giftList = event.target.value.split(",");
    let gift = {};
    if (giftList.length % 2 === 0) {
      for (let i = 0; i < giftList.length - 1; i += 2) {
        gift[giftList[i]] = giftList[i + 1];
      }
    }
    this.setState({
      gifts: gift,
    });
  }

  randomStringGiftcode() {
    const length = Math.floor(Math.random() * 4) + 7;
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let strRan = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      strRan += chars.charAt(i);
    }
    console.log(strRan);
    //this.setState({GiftCode:strRan})
    return strRan;
  }

  onCreateGiftCode = (e) => {
    var msg = "";
    e.preventDefault();

    if(Object.keys(this.state.gifts).length === 0) {
      window.alert('Rewards is missing');
      return;
    }
    if(!this.state.GiftCode) {
      window.alert('Gift Code is missing');
      return;
    }
    if(!this.state.endDate) {
      window.alert('End Date is missing');
      return;
    }
    if(!this.state.amount) {
      window.alert('Amount is missing');
      return;
    }
    if(this.state.GiftCode.length < 6) {
      window.alert('Gift Code Must be at least 6 charater');
      return;
    }
    if(this.state.GiftCode.includes('ABC') || this.state.GiftCode.includes('123')) {
      window.alert('Gift Code is weak');
      return;
    }
    axios
      .post(config.base_url_game + config.url_CreateGiftCode, {
        GiftCode: this.state.GiftCode,
        Rewards: this.state.gifts,
        Amount: this.state.amount,
        EndDate: this.state.endDate,
        Creator: "ADMIN",
      })
      .then((results) => {
        console.log(results);
        window.alert(JSON.stringify(results.data.data));
      })
      .catch((err) => {
        window.alert(msg);
        console.log(err);
      });
  };

  render() {
    const { handleSubmit, reset, t } = this.props;
    const { showPassword, GiftCode } = this.state;

    return (
      <Col xs={12} md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              {/* <h5 className="bold-text">{t('forms.form_layouts.vertical_form')}</h5> */}
              <h5 className="bold-text">Create Giftcode</h5>
            </div>
            <form className="form" onSubmit={this.onCreateGiftCode}>
              {/* <Col xs={6} md={6} lg={6} xl={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">GiftCode</span>
                <div className="form__form-group-field">

                  <Field
                    name="GiftCode"
                    component="input"
                    type="text"
                    placeholder="giftcode"
                    values={this.state.GiftCode}
                    readOnly = "true"
                  />
                  <button
                    type="button"
                    className={`form__form-group-button${
                      showPassword ? ' active' : ''
                    }`}
                    onClick={e => this.OnRefreshGiftCode(e)}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>
              </Col>
              */}
              <Col xs={6} md={6} lg={6} xl={4}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    Name Gift Code (Should use recomment){" "}
                  </span>
                  <div className="form__form-group-field">
                    <input
                      name="giftcode"
                      component={renderField}
                      type="text"
                      value={this.state.GiftCode}
                      onChange={this.handleChangeName.bind(this)}
                    />
                    <button
                      type="button"
                      className={`form__form-group-button${
                        showPassword ? " active" : ""
                      }`}
                      onClick={(e) => this.OnRefreshGiftCode(e)}
                    >
                      <EyeIcon />
                    </button>
                  </div>
                </div>
              </Col>

              <Col xs={6} md={6} lg={6} xl={4}>
                <div className="form__form-group">
                  <span className="form__form-group-label">Amount</span>
                  <div className="form__form-group-field">
                    <input
                      name="Amount"
                      component={renderField}
                      type="text"
                      value={this.state.amount}
                      onChange={this.handleChangeAmount.bind(this)}
                    />
                  </div>
                </div>
              </Col>
              <Col xs={6} md={6} lg={6} xl={4}>
                <div className="form__form-group">
                  <span className="form__form-group-label">End Date</span>
                  <div className="form__form-group-field">
                    <Field
                      name="enddate"
                      component={renderDateTimePickerField}
                      value={this.state.endDate}
                      onChange={this.handleEndDateChange.bind(this)}
                    />
                    <div className="form__form-group-icon">
                      <TimetableIcon />
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={6} lg={6} xl={12}>
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    GiftCode (Enter valid format)
                  </span>
                  <div className="form__form-group-field">
                    <Field
                      name="Rewards"
                      component="input"
                      type="text"
                      placeholder="định dạng: id1,amount,id2,amount..."
                      onChange={this.handleGiftChange.bind(this)}
                    />
                  </div>
                </div>
              </Col>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">
                  Submit
                </Button>
                {/* <Button
                  type="button"
                  color="primary"
                  onClick={e => this.showPassword(e)}
                >
                  View
                </Button> */}
                <Button type="button" onClick={reset}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: "vertical_form_layout", // a unique identifier for this form
})(withTranslation("common")(GiftCodeForm));
