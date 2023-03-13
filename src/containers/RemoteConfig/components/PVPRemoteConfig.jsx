import React, { PureComponent } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
  Col,
  Button,
  ButtonToolbar,
} from "reactstrap";
import Panel from "../../../shared/components/Panel";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config/appConfig";
import renderSelectField from "../../../shared/components/form/Select";
import { Field, reduxForm } from "redux-form";
import classnames from "classnames";
import renderDateTimePickerField from "../../../shared/components/form/DateTimePicker";
import { CustomNotification } from "../../UI/Notification/components/CustomNotification";
import { HandleError } from "../../HandleError/HandleError";

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

class PVPRemoteConfig extends PureComponent {
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
      activeTab: "1",
      activeIndex: 0,
      timePlay: null,
      season: null,
      seasonTime: null,
      endSeason: null,
      nextSeason: null,
      userId: null,
      score: null,
    };
  }
  toggle = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  handleChangeValue = (e) => {
    console.log(e.target.name, e.target.value)
    var data = {};
    data[e.target.name] = e.target.value;
    console.log(data)
    this.setState(data);
  };

  handleEndSeasonChange = (event) => {
    this.setState({
      endSeason: event,
    });
  };

  handleNextSeasonChange = (event) => {
    this.setState({
      nextSeason: event,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.timePlay != this.props.timePlay) {
      let config = this.props.leaderboard;
      this.setState({
        timePlay: this.props.timePlay,
        season: config.Season,
        seasonTime: config.SeasonTime,
        endSeason: new Date(config.EndSeason),
        nextSeason: new Date(config.NextSeason),
      });
    }
  }

  onSetScoreSubmit = (e) => {
    if (e) e.preventDefault();
    if (!this.state.userId || !this.state.score) return;

    axios
      .post(config.server_url + config.prefix_pvp + config.url_leaderboard, {
        userId: this.state.userId,
        score: this.state.score,
      })
      .then((rs) =>  {
        console.log(rs.data) 
        new CustomNotification().show("success", "Success", "Set Battle Point Succeess");
      })
      .catch((error) => {
        new HandleError(error);
      });
  };

  onUpdateConfig = (e) => {
    if (e) e.preventDefault();
    console.log({
      Season: this.state.season,
      SeasonTime: this.state.seasonTime,
      EndSeason: new Date(this.state.endSeason),
      NextSeason: new Date(this.state.nextSeason),
    });

    axios
      .patch(config.server_url + config.prefix_pvp + config.url_config, {
          timePlay: this.state.timePlay,
          leaderboard: {
            Season: this.state.season,
            SeasonTime: this.state.seasonTime,
            EndSeason: new Date(this.state.endSeason),
            NextSeason: new Date(this.state.nextSeason),
          },
      })
      .then((rs) =>  {
        console.log(rs.data) 
        new CustomNotification().show("success", "Success", "Set pvp config succeed");
      })
      .catch((error) => {
        new HandleError(error);
        console.log(error);
      });
  };

  render() {
    const { pristine, reset, submitting } = this.props;
    const { activeTab } = this.state;
    return (
      <Card>
        <CardBody>
          <div className="tabs tabs--bordered-top">
            <div className="tabs__wrap">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Season
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Time Play
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    Set Score
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <form
                    className="form form--horizontal"
                    onSubmit={this.onUpdateConfig}
                  >
                    <div className="form__form-group">
                      <span className="form__form-group-label">Season</span>
                      <div className="form__form-group-field">
                        <input
                          name="season"
                          component={renderField}
                          value={this.state.season}
                          onChange={this.handleChangeValue}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Season Time
                      </span>
                      <div className="form__form-group-field">
                        <input
                          name="seasonTime"
                          component={renderField}
                          value={this.state.seasonTime}
                          onChange={this.handleChangeValue}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">End Season</span>
                      <div className="form__form-group-field">
                        <Field
                          name="endSeason"
                          component={renderDateTimePickerField}
                          defaultValue={this.state.endSeason}
                          onChange={this.handleEndSeasonChange}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">
                        Next Season
                      </span>
                      <div className="form__form-group-field">
                        <Field
                          name="nextSeason"
                          component={renderDateTimePickerField}
                          defaultValue={this.state.nextSeason}
                          onChange={this.handleNextSeasonChange}
                        />
                      </div>
                    </div>
                    <ButtonToolbar className="form__button-toolbar">
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                      <Button
                        type="button"
                        onClick={reset}
                        disabled={pristine || submitting}
                      >
                        Cancel
                      </Button>
                    </ButtonToolbar>
                  </form>
                </TabPane>
                <TabPane tabId="2">
                  <form
                    className="form form--horizontal"
                    onSubmit={this.onUpdateConfig}
                  >
                    <div className="form__form-group">
                      <span className="form__form-group-label">Time Play</span>
                      <div className="form__form-group-field">
                        <input
                          name="timePlay"
                          component={renderField}
                          value={this.state.timePlay}
                          onChange={this.handleChangeValue}
                        />
                      </div>
                    </div>
                    <ButtonToolbar className="form__button-toolbar">
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                      <Button
                        type="button"
                        onClick={reset}
                        disabled={pristine || submitting}
                      >
                        Cancel
                      </Button>
                    </ButtonToolbar>
                  </form>
                </TabPane>
                <TabPane tabId="3">
                  <form
                    className="form form--horizontal"
                    onSubmit={this.onSetScoreSubmit}
                  >
                    <div className="form__form-group">
                      <span className="form__form-group-label">User Id</span>
                      <div className="form__form-group-field">
                        <input
                          name="userId"
                          component={renderField}
                          type="userid"
                          value={this.state.userId}
                          onChange={this.handleChangeValue}
                        />
                      </div>
                    </div>
                    <div className="form__form-group">
                      <span className="form__form-group-label">Score</span>
                      <div className="form__form-group-field">
                        <input
                          name="score"
                          component={renderField}
                          type="score"
                          value={this.state.score}
                          onChange={this.handleChangeValue}
                        />
                      </div>
                    </div>
                    <ButtonToolbar className="form__button-toolbar">
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                      <Button
                        type="button"
                        onClick={reset}
                        disabled={pristine || submitting}
                      >
                        Cancel
                      </Button>
                    </ButtonToolbar>
                  </form>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default reduxForm({
  form: "horizontal_form_validation", // a unique identifier for this form
})(withTranslation("common")(PVPRemoteConfig));
