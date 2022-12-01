import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Panel from '../../../../shared/components/Panel';

//export default withTranslation('common')(TradeHistory);
export default class TradeHistory extends PureComponent {
  static propTypes = {
    dir: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  renderTableData() {
    console.log(this.props);
    if (this.props.lsCountryIAP) {
      return this.props.lsCountryIAP.map((nation) => {
        const { name, count, total } = nation; //destructuring
        return (
          <tr>
            <td>
              <p className="bold-text dashboard__btc">{name}</p>
            </td>
            <td>{count}</td>
            <td>{total}</td>
          </tr>
        );
      });
    } else {
      return '';
    }
  }

  render() {
    return (
      <Panel xl={4} lg={4} md={12} xs={12} title={this.props.title} subhead="">
        <Table responsive striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Total (USD)</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </Panel>
    );
  }
}
