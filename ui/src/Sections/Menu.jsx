import React from 'react';
import { Menu, Icon, Button } from 'antd';
import Settings from './Settings.jsx';
import {Grid, Row} from 'react-bootstrap';
const SubMenu = Menu.SubMenu;


class MenuBar extends React.Component {
  state = {
    collapsed: true,
    showSettings: false
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      showSettings: !this.state.showSettings
    });
  }

  toggleSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings
    })
  }

  menuWidth = () => {
    var width;
    this.state.collapsed ? width = '4vw' : width = '8vw';
    return {width}
  }

  render() {
    return (
      <div style={{ width: 240, zIndex: 200 }}>

        <br/>
        <Row>
        <Menu
          defaultSelectedKeys={['0']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          style={this.menuWidth()}
          id='sidemenu'
        >
        <Menu.Item key="0">
          <a href='#main'>
            <Icon type="api" />
            <span>Viz Panel</span>
          </a>
        </Menu.Item>
          <Menu.Item key="1">
            <a href='#about'>
              <Icon type="ellipsis" />
              <span>About</span>
            </a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href='#contribute'>
              <Icon type="edit" />
              <span>Comments</span>
            </a>
          </Menu.Item>
          <Menu.Item key="3" onClick={this.toggleSettings}>
            <Icon type="tool" onClick={this.toggleSettings}/>
            <span onClick={this.toggleSettings}>Settings</span>
          </Menu.Item>
        </Menu>
        </Row>

        <Row>
          <Button type="primary" id='expand' onClick={this.toggleCollapsed} style={expandButtonStyle}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        </Row>

        {this.state.showSettings ? (
          <Row>
            <Settings passStateInSettings={this.props.passStateInSettings}/>
          </Row>
        ) : '' }

      </div>
    );
  }
}

const expandButtonStyle = {
  marginTop: '10%'
  // marginLeft: '1%',
  // position: 'fixed'
  // float: 'left'
  // display: 'none'
}

export default MenuBar;
