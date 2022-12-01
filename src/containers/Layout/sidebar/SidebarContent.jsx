import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    // changeToDark: PropTypes.func.isRequired,
    // changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    // const { changeToLight, changeToDark } = this.props;

    return (
      <div className='sidebar__content'>
        <ul className='sidebar__block'>
          <SidebarCategory title='Mails' icon='envelope'>
            <SidebarLink title='Mail System' route='/mail/system' onClick={this.hideSidebar} />
            <SidebarLink title='Mail Notify Version' route='/mail/notifyversion' onClick={this.hideSidebar} />
            <SidebarLink title='Mail Reward' route='/mail/reward' onClick={this.hideSidebar} />

          </SidebarCategory>
        </ul>
        <ul className='sidebar__block'>
          <SidebarLink title='Log Out' icon='exit' route='/log_in' />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
