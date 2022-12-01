import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import EyeIcon from 'mdi-react/EyeIcon';
import renderCheckBoxField from '../../../../shared/components/form/CheckBox';

class VerticalForm extends PureComponent {
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
    };
  }

  showPassword = e => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  OnSubmitCLick(values) {
    // handle data after pass validate
    window.alert(`You submitted Local :\n\n${JSON.stringify(values, null, 2)}`);
  }

  render() {
    const { handleSubmit, reset, t } = this.props;
    const { showPassword } = this.state;

    return (
      <Col xs={12} md={12} lg={12} xl={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              {/* <h5 className="bold-text">{t('forms.form_layouts.vertical_form')}</h5> */}
              <h5 className="bold-text">Xem thông tin User</h5>
              <h5 className="subhead">Copy UserID Here</h5>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">userID</span>
                <div className="form__form-group-field">
                  <Field
                    name="userID"
                    component="input"
                    type="text"
                    placeholder="userID"
                  />
                  <button
                    type="button"
                    className={`form__form-group-button${
                      showPassword ? ' active' : ''
                    }`}
                    onClick={e => this.showPassword(e)}
                  >
                    <EyeIcon />
                  </button>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">DisplayName</span>
                <div className="form__form-group-field">
                  <Field
                    name="DisplayName"
                    component="input"
                    type="text"
                    placeholder="DisplayName"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">FacebookID</span>
                <div className="form__form-group-field">
                  <Field
                    name="FacebookID"
                    component="input"
                    type="text"
                    placeholder="FacebookID"
                  />
                </div>
              </div>

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
  form: 'vertical_form_layout', // a unique identifier for this form
})(withTranslation('common')(VerticalForm));
