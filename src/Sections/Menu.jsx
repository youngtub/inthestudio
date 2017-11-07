import React from 'react';
import { Menu, Icon, Button, Anchor } from 'antd';
import Settings from './Settings.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
const SubMenu = Menu.SubMenu;


class MenuBar extends React.Component {
  state = {
    collapsed: true,
    showSettings: false
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  toggleSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings
    })
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
          style={menuStyle}
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
        {this.state.showSettings ? (
          <Row>
            <Settings passStateInSettings={this.props.passStateInSettings}/>
          </Row>
        ) : '' }

        {<Button type="primary" onClick={this.toggleCollapsed} style={expandButtonStyle}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>}

      </div>
    );
  }
}

const menuStyle = {
  position: 'fixed'
}

const expandButtonStyle = {
  marginTop: '8%',
  marginLeft: '1%',
  position: 'fixed',
  display: 'none'
}

export default MenuBar;
