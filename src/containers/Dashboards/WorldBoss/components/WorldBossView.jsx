import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Table,  DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Panel from '../../../../shared/components/Panel';
import { Link } from 'react-router-dom';
import DotsHorizontalIcon from 'mdi-react/DotsHorizontalIcon';
import axios from 'axios';
import config from '../../../../config/appConfig';

const DropDownMore = ({ index, handleDeleteRow,handleViewData }) => (
  <UncontrolledDropdown className="dashboard__table-more">
    <DropdownToggle>
      <p><DotsHorizontalIcon /></p>
    </DropdownToggle>
    <DropdownMenu className="dropdown__menu">
      {/* <Link to={`/dashboard_crypto/edit/${index}`}><DropdownItem>View</DropdownItem></Link> */}
      <DropdownItem onClick={handleViewData}>View</DropdownItem>
      <DropdownItem onClick={handleDeleteRow}>Delete</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);



//export default withTranslation('common')(TradeHistory);
export default class WorldBossView extends PureComponent {
  static propTypes = {
    dir: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

OnViewUserData = (index,e) =>{
  window.open(config.cms_url + `/user/getUserData?userID=` + this.props.lsCountryIAP[index].UserId, '_blank');
}

  onDeleteCryptoTableData = (index, e) => {
 
    e.preventDefault();

    axios
    .post(config.base_url + config.url_deleteLeaderBoard, {
      UserId: this.props.lsCountryIAP[index].UserId,
      LeaderboardName: 'WorldBoss'
    })
    .then(function(response) {
      if (response.status === 200) {
        let data = response.data;
        if (data.status === 'ok') {
          console.log(response.data);
          this.props.lsCountryIAP.splice(index,1);
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    })


  };

  
  renderTableData() {

    if (this.props.lsCountryIAP) {
      return this.props.lsCountryIAP.map((nation,index) => {
        const { UserId, DisplayName, Score } = nation; //destructuring
        return (
          <tr>
             <td key='index'>{index +1}</td>
            <td key='userid'>{UserId}</td>
            <td>
              <p className='bold-text dashboard__btc'>{DisplayName}</p>
            </td>
            <td key='score'>{Score}</td>
            <td key='dropdown'>
              <DropDownMore index={index} handleDeleteRow={e => this.onDeleteCryptoTableData(index, e)} 
              handleViewData={e => this.OnViewUserData(index, e)}/> 
              
              {/*  */}
            </td>
          </tr>
        );
      });
    } else {
      return '';
    }
  }


  
  render() {
    return (
      <Panel xl={12} lg={12} md={12} xs={12} title={this.props.title} subhead=''>
        <Table key='pvp' responsive striped>
          <thead>
            <tr>
            <th></th>
            <th>UserId</th>
            <th>Name</th>
            <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </Panel>
    );
  }
}
