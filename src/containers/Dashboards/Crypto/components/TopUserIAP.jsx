import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Panel from '../../../../shared/components/Panel';
import axios from 'axios';

const brush = (theme) => {
  if (theme === 'theme-light') {
    return '#f2f4f7';
  }
  return '#38373f';
};

const toPercent = (decimal) => {
	return `${decimal}%`;
};

const renderTooltipContent = (o) => {

  
	const { payload, label } = o;

 if(payload.length === 0)
  return '';
 else
 {
  return (
  	<div className="customized-tooltip-content">
    	<p ><b>{`${label} `}</b></p>
      <ul className="list">
	        <li >
            {`${payload[0].name}: ${payload[0].value}% `}
          </li>
      </ul>
    </div>
  );

  };
} 

export default class TopUserIAP extends PureComponent {
  static propTypes = {
      theme: PropTypes.string.isRequired,
      dir: PropTypes.string.isRequired,
      data: PropTypes.array.isRequired
  }
  
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }
  
  renderTableData() {
    console.log(this.props);
    if (this.props.lsUserIAP) {
      return this.props.lsUserIAP.map((nation) => {
        const { userID, country, total, totalIAP} = nation; //destructuring
        return (
          <tr>
            <td>
              <p className="bold-text dashboard__btc">{userID}</p>
            </td>
            <td key='cn'>{country}</td>
            <td key='total' >{total}</td>
            <td key='totalIAP' >{totalIAP}</td>
          </tr>
        );
      });
    } else {
      return '';
    }
  }

  render() {
    return(
    <Panel
      xl={12}
      lg={12}
      md={12}
      xs={12}
      title="TOP 10 USER IAP"
      subhead={new Date().toDateString()}
    >
         <Table  responsive striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Total (USD)</th>
              <th>Total IAP (After Tax)</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
    </Panel>
    );  
  }
  
  
}
