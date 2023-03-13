import React, { PureComponent } from "react";
import { Field, reduxForm, Form } from "redux-form";
import { connect } from "react-redux";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert, Button } from "reactstrap";
import renderCheckBoxField from "../form/CheckBox";
import axios from "axios";
import appConfig from "../../../config/appConfig";
import { CustomNotification } from "../../../containers/UI/Notification/components/CustomNotification";
import { HandleError } from "../../../containers/HandleError/HandleError";


class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    errorMsg: PropTypes.string,
    fieldUser: PropTypes.string,
    typeFieldUser: PropTypes.string,
    form: PropTypes.string.isRequired,
  };

  static defaultProps = {
    errorMessage: "",
    errorMsg: "",
    fieldUser: "Username",
    typeFieldUser: "text",
  };

  constructor() {
    super();
    this.state = {
      redirect: false,
      showPassword: false,
      username: "",
      password: "",
    };

    this.showPassword = this.showPassword.bind(this);
  }

  showPassword(e) {
    e.preventDefault();
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  onChangeValue = (e) => {
    var data = {};
    data[e.target.name] = e.target.value;
    this.setState(data);
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      let user = {
        email: this.state.username,
        password: this.state.password,
      };

      axios
        .post(
          appConfig.server_url + appConfig.prefix_user + appConfig.url_login,
          user
        )
        .then((response) => {
          let data = response.data;
          if (data.code === 1) {
            sessionStorage.setItem("userRole", JSON.stringify(data.data.role));
            sessionStorage.setItem("userName", data.data.userName);
            sessionStorage.setItem("accessToken", data.data.accessToken);
            window.location.replace(`http://${appConfig.ip_adress}:${appConfig.port_listener}${appConfig.default_router}`);
          } else {
            new CustomNotification().show("danger", "Error", data.message)
          }
        })
        .catch((error) => {
          new HandleError(error);
        });
    }
  };

  render() {
    const {
      handleSubmit,
      errorMessage,
      errorMsg,
      fieldUser,
      typeFieldUser,
      form,
    } = this.props;
    const { showPassword } = this.state;
    return (
      <Form className="form login-form" onSubmit={handleSubmit}>
        {this.renderRedirect()}
        <Alert color="danger" isOpen={!!errorMessage || !!errorMsg}>
          {errorMessage}
          {errorMsg}
        </Alert>
        <div className="form__form-group">
          <span className="form__form-group-label">{fieldUser}</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="username"
              component="input"
              type={typeFieldUser}
              placeholder={fieldUser}
              onChange={this.onChangeValue}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              component="input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={this.onChangeValue}
            />
            <button
              type="button"
              className={`form__form-group-button${
                showPassword ? " active" : ""
              }`}
              onClick={(e) => this.showPassword(e)}
            >
              <EyeIcon />
            </button>
            <div className="account__forgot-password">
              <a href="/">Forgot a password?</a>
            </div>
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group form__form-group-field">
            <Field
              name={`remember_me-${form}`}
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div>
        </div>
        <div className="account__btns">
          <Button
            className="account__btn"
            onClick={(e) =>
              this.setState({
                redirect: true,
              })
            }
            color="primary"
          >
            Sign In
          </Button>

          <Link className="btn btn-outline-primary account__btn" to="/register">
            Create Account
          </Link>
        </div>
      </Form>
    );
  }
}

export default withRouter(
  connect((state) => ({
    errorMsg: state.user.error,
  }))(reduxForm()(LogInForm))
);
