import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class SiderNav extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
      return(
        <Menu
          onClick={this.handleClick}
          style={{ width: 256, minHeight:'100vh'}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
            <Menu.Item key='Home'>
                หน้าแรก  
            </Menu.Item>
            <SubMenu key="sub1" title="Root of Equations">
              <Menu.Item key="1">Graphical Method</Menu.Item>
              <Menu.Item key="2">Intragram</Menu.Item>
            </SubMenu>
        </Menu>
      );
  }
}

export default SiderNav;