import React, { PureComponent } from "react";
import {
  Container,
  Card,
  CardBody,
  Col,
  Button,
  ButtonToolbar,
  Row,
  Table,
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import TimetableIcon from "mdi-react/TimetableIcon";
import renderSelectField from "../../../../shared/components/form/Select";
import renderCheckBoxField from "./../../../../shared/components/form/CheckBox";
import renderDateTimePickerField from "./../../../../shared/components/form/DateTimePicker";
import validate from "../../../Form/FormValidation/components/validate";
import axios from "axios";
import Expand from "../../../../shared/components/Expand";
import config from "../../../../config/appConfig";
import TextareaAutosize from "react-textarea-autosize";
import { stringNull } from "./validate";
import { LanguageOptions,MailType, TypeReward } from "../../Helper";
import setAuthHeader from "../../../../shared/components/auth/authJwt";

const getTimezoneOffset = new Date().getTimezoneOffset() * 60000;

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

const StatusFormatter = (isDeleted) => {
  if (isDeleted === false) {
    return <span className="badge badge-success">Active</span>;
  } else {
    return <span className="badge badge-danger">Delete</span>;
  }
};

StatusFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

class MailReward extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  };

  constructor() {
    super();

    this.state = {
      mailId: "",
      userId: "",
      language: "",
      title: "",
      sender: "",
      content: "",
      gifts: {},
      typeReward: "",
      expiryDate: "",
      editMail: "",
      endDate: "",
      isAddMail: false,
      isEditMail: false,
      isSendMailByUserId: false,
      listMailReward: [],
      viewByLanguage: "English",

      disabledSubmit: false,
    };
  }

  componentDidMount() {
    setAuthHeader();
    this.getMailReward();
  }

  getMailReward = async () => {
    await axios
      .get(config.server_url + config.prefix_mail + config.url_mailreward, {
        params: {
          language: this.state.viewByLanguage,
        }
      })
      .then((data) => {
        if (data.data) {
          this.setState({
            listMailReward: data.data,
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleUserIdChange(event) {
    this.setState({
      userId: event.target.value,
    });
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  handleSenderChange(event) {
    this.setState({
      sender: event.target.value,
    });
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleExpiryDateChange(event) {
    this.setState({
      expiryDate: event.target.value,
    });
  }

  handleEndDateChange(event) {
    this.setState({
      endDate: event,
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

  handleIdChange(event) {
    this.setState({
      mailId: event.target.value,
    });
  }

  handleLanguageChange(event) {
    this.setState({
      language: event.value,
    });
  }

  handleTypeRewardChange(event) {
    this.setState({
      typeReward: event.value,
    });
  }

  handleViewByLanguageChange(event) {
    this.setState(
      {
        viewByLanguage: event.value,
      },
      () => {
        this.getMailReward();
      }
    );
  }

  handleActiveChange(event) {
    this.setState({
      isActive: event.value,
    });
  }

  onSubmitClick = (e) => {
    var msg = "";
    e.preventDefault();
    this.setState({ disabledSubmit: true });

    axios
      .post(config.server_url + config.prefix_mail + config.url_mailreward, {
        sender: this.state.sender,
        title: this.state.title,
        content: this.state.content,
        type: this.state.typeReward,
        gifts: this.state.gifts,
        expiryDate: this.state.expiryDate,
      })
      .then(function(response) {
        console.log(response);
        if (response.status === 200) {
          msg = "Add Mail Reward Success";
        } else {
          msg = `Add Mail Err: ${response.data}`;
        }
      })
      .then(() => {
        window.alert(msg);
        this.setState({
          disabledSubmit: false,
        });
      })
      .catch((error) => {
        window.alert(error);

        this.setState({
          disabledSubmit: false,
        });
      });
  };

  onEditMail(event) {
    if (event && event.target) {
      if (event.target.checked) {
        this.state.editMail = event.target.name;
        this.setState({
          isEditMail: true,
          isAddMail: false,
          isSendMailByUserId: false,
        });
        let mail = "";
        axios
          .post(config.server_url + config.prefix_mail + config.url_mailDetail, {
            mailId: event.target.name,
            mailType: MailType.Reward,
          })
          .then(function(response) {
              mail = response.data;
          })
          .then(() => {
            console.log(mail);
            if (mail) {
              if (mail.mail[this.state.viewByLanguage]) {
                this.setState({
                  title: mail.mail[this.state.viewByLanguage].title,
                  content: mail.mail[this.state.viewByLanguage].content,
                });
              }
              this.setState({
                sender: mail.sender,
                expiryDate: mail.expiryDate,
                isActive: mail.isDeleted ? "1" : "0",

              });
            }
          });
      } else {
        this.setState({ isEditMail: false });
      }
    }
  }

  onUpdateMailClick = (e) => {
    var msg = "";
    e.preventDefault();
    axios
      .post(config.server_url + config.prefix_mail + config.url_updateMail, {
        mailId: this.state.editMail,
        sender: this.state.sender,
        language: this.state.viewByLanguage,
        title: this.state.title,
        content: this.state.content,
        expiryDate: this.state.expiryDate,
        isActive: this.state.isActive,
        isSystemMail: false,
      })
      .then(function(response) {
        if (response.data.Status === 1) {
          msg = "Update Mail Success";
        } else {
          msg = `Update Mail Err: ${response.data.Body.Err}`;
        }
      })
      .then(() => {
        window.alert(msg);
      });
  };

  validateInput = (userId, title, content, endDate) => {
    if (stringNull([userId, title, content, endDate])) return true;
    if (userId.length !== 24) return true;
    return false;
  };

  onSendMailToUser = (e) => {
    var msg = "";
    e.preventDefault();
    if (
      this.validateInput(
        this.state.userId,
        this.state.title,
        this.state.content,
        this.state.endDate
      )
    ) {
      window.alert("Check Input");
    } else {

      this.setState({ disabledSubmit: true });
      axios
        .post(config.server_url + config.prefix_mail + config.url_sendtoUser, {
          userId: this.state.userId,
          title: this.state.title,
          content: this.state.content,
          gifts: this.state.gifts,
          endDate: new Date(this.state.endDate - getTimezoneOffset),
        })
        .then(function(response) {
          console.log(response.data);
          window.alert(response.data);
          this.setState({
            disabledSubmit: false,
          });
        }).catch(error => {
         console.log(error.response);
          this.setState({
            disabledSubmit: false,
          });
        });
    }
  };

  render() {
    const { pristine, reset, submitting } = this.props;
    const { listMailReward } = this.state;

    return (
      <Col md={12} lg={12} xl={12}>
        <Row>
          <Card>
            <CardBody>
              <form className="form">
                <Container>
                  <Row>
                    <Col md={6} xl={3}>
                      <Field
                        name="language"
                        component={renderSelectField}
                        options={LanguageOptions}
                        value={this.state.viewByLanguage}
                        placeholder="English"
                        onChange={this.handleViewByLanguageChange.bind(this)}
                      />
                    </Col>
                    <Col md={6} xl={6}></Col>
                    <Col md={6} xl={3}>
                      <div style={{ float: "left" }}>
                        <Expand
                          title="New"
                          color="secondary"
                          handleClick={() => {
                            this.setState({
                              isAddMail: true,
                              isEditMail: false,
                              isSendMailByUserId: false,
                            });
                          }}
                        />
                        <Expand
                          title="Send To User"
                          color="warning"
                          handleClick={() => {
                            this.setState({
                              isAddMail: false,
                              updateTemplate: false,
                              isEditMail: false,
                              isSendMailByUserId: true,
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </form>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Card>
            <CardBody className="products-list">
              <div className="card__title">
                <h5 className="bold-text">List Mail Rewards</h5>
                <h6 className="subhead">
                  Total Language Supports: {LanguageOptions.length}
                </h6>
              </div>
              <div className="table">
                <Table
                  responsive
                  className="table--bordered dashboard__table-crypto"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>_id</th>
                      <th>Type</th>
                      <th>Title</th>
                      <th>Expiry Date</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listMailReward.map((mail, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td dir="ltr">{mail.id}</td>
                        <td dir="ltr">
                          {
                            TypeReward.filter(
                              (option) => option.value == mail.type
                            )[0].label
                          }
                        </td>
                        <td dir="ltr">{mail.title}</td>
                        <td dir="ltr">{mail.expiryDate}</td>
                        <td>{mail.createdAt.slice(0, 16)}</td>
                        <td>{mail.updatedAt.slice(0, 16)}</td>
                        <td>{StatusFormatter(mail.isDeleted)}</td>
                        <td>
                          <Field
                            name={mail.id}
                            id={index}
                            component={renderCheckBoxField}
                            className="colored-click"
                            onChange={this.onEditMail.bind(this)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Row>
        {this.state.isAddMail ? (
          <Row>
            <Card>
              <CardBody>
                <div className="card__title">
                  <h5 className="bold-text">Mail Reward</h5>
                  <h3 className="page-subhead subhead">
                    New Mail Use Default English Language
                  </h3>
                </div>
                <form
                  className="form form--horizontal"
                  onSubmit={this.onSubmitClick}
                >
                  <div className="form__form-group">
                    <span className="form__form-group-label">Type Reward</span>
                    <div className="form__form-group-field">
                      <Field
                        name="typereward"
                        component={renderSelectField}
                        options={TypeReward}
                        value={this.state.typeReward}
                        onChange={this.handleTypeRewardChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Title</span>
                    <div className="form__form-group-field">
                      <Field
                        name="title"
                        component={renderField}
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange.bind(this)}
                        placeholder="Note: Không sử dụng các ký tự đặc biệt::  @ * / +"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Sender</span>
                    <div className="form__form-group-field">
                      <Field
                        name="sender"
                        component={renderField}
                        type="text"
                        value={this.state.sender}
                        onChange={this.handleSenderChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Content</span>
                    <div className="form__form-group-field">
                      <TextareaAutosize
                        name="content"
                        component={renderField}
                        type="text"
                        value={this.state.content}
                        onChange={this.handleContentChange.bind(this)}
                        placeholder="Note: Không sử dụng các ký tự đặc biệt:  @ * / +"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Expiry Date</span>
                    <div className="form__form-group-field">
                      <Field
                        name="expirydate"
                        component={renderField}
                        type="text"
                        value={this.state.expiryDate}
                        onChange={this.handleExpiryDateChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Gifts</span>
                    <div className="form__form-group-field">
                      <Field
                        name="gifts"
                        component="input"
                        type="text"
                        placeholder="Optional: nhập các phần quà dạng string, string ( cách nhau bởi dấu phẩy)"
                        value={this.state.gifts}
                        onChange={this.handleGiftChange.bind(this)}
                      />
                    </div>
                  </div>
                  <ButtonToolbar className="form__button-toolbar">
                    <Button
                      disabled={this.state.disabledSubmit}
                      color="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        reset();
                        this.setState({ isAddMail: false });
                      }}
                      disabled={pristine || submitting}
                    >
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </form>
              </CardBody>
            </Card>
          </Row>
        ) : null}
        {this.state.isEditMail ? (
          <Row>
            <Card>
              <CardBody>
                <div className="card__title">
                  <h5 className="bold-text">Edit mail</h5>
                  <h6 className="subhead">{this.state.editMail}</h6>
                </div>
                <form
                  className="form form--horizontal"
                  onSubmit={this.onUpdateMailClick}
                >
                  <div className="form__form-group">
                    <span className="form__form-group-label">Sender</span>
                    <div className="form__form-group-field">
                      <input
                        name="sender"
                        component={renderField}
                        type="text"
                        value={this.state.sender}
                        onChange={this.handleSenderChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Title</span>
                    <div className="form__form-group-field">
                      <input
                        name="title"
                        component={renderField}
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange.bind(this)}
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">Content</span>
                    <div className="form__form-group-field">
                      <TextareaAutosize
                        name="content"
                        component={renderField}
                        type="text"
                        value={this.state.content}
                        onChange={this.handleContentChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Expiry Date</span>
                    <div className="form__form-group-field">
                      <input
                        name="expriyDate"
                        component={renderField}
                        type="text"
                        value={this.state.expiryDate}
                        onChange={this.handleExpiryDateChange.bind(this)}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Active</span>
                    <div className="form__form-group-field">
                      <Field
                        name="select"
                        component={renderSelectField}
                        type="text"
                        value={this.state.isActive}
                        options={[
                          { value: "0", label: "True" },
                          { value: "1", label: "False" },
                        ]}
                        placeholder={
                          this.state.isActive == "0" ? "True" : "False"
                        }
                        onChange={this.handleActiveChange.bind(this)}
                      />
                    </div>
                  </div>
                  <ButtonToolbar className="form__button-toolbar">
                    <Button color="primary" type="submit">
                      Update
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        reset();
                        this.setState({ isEditMail: false });
                      }}
                      disabled={pristine || submitting}
                    >
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </form>
              </CardBody>
            </Card>
          </Row>
        ) : null}
        {this.state.isSendMailByUserId ? (
          <Row>
            <Card>
              <CardBody>
                <div className="card__title">
                  <h5 className="bold-text">Mail for User Id</h5>
                  <h3 className="page-subhead subhead">
                    Support English Language
                  </h3>
                </div>
                <form
                  className="form form--horizontal"
                  onSubmit={this.onSendMailToUser}
                >
                  <div className="form__form-group">
                    <span className="form__form-group-label">User Id</span>
                    <div className="form__form-group-field">
                      <Field
                        name="userid"
                        component={renderField}
                        type="text"
                        value={this.state.userId}
                        onChange={this.handleUserIdChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Title</span>
                    <div className="form__form-group-field">
                      <Field
                        name="title"
                        component={renderField}
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Content</span>
                    <div className="form__form-group-field">
                      <TextareaAutosize
                        name="content"
                        component={renderField}
                        type="text"
                        value={this.state.content}
                        onChange={this.handleContentChange.bind(this)}
                      />
                    </div>
                  </div>
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
                  <div className="form__form-group">
                    <span className="form__form-group-label">Gifts</span>
                    <div className="form__form-group-field">
                      <Field
                        name="gifts"
                        component="input"
                        type="text"
                        placeholder="Optional: nhập các phần quà dạng string, string ( cách nhau bởi dấu phẩy)"
                        value={this.state.gifts}
                        onChange={this.handleGiftChange.bind(this)}
                      />
                    </div>
                  </div>
                  <ButtonToolbar className="form__button-toolbar">
                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        reset();
                        this.setState({ isSendMailByUserId: false });
                      }}
                      disabled={pristine || submitting}
                    >
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </form>
              </CardBody>
            </Card>
          </Row>
        ) : null}
      </Col>
    );
  }
}

export default reduxForm({
  form: "horizontal_form_validation", // a unique identifier for this form
  validate,
})(withTranslation("common")(MailReward));
