import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

class SiderNav extends React.Component {

  render() {
      return(
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
            > 
              <Menu.Item key="1">หน้าแรก<Link to="/" /></Menu.Item>
              <SubMenu key="sub1" title="Root of equations">
                <Menu.Item key="2">Bisection Method<Link to="/bisectionmethod" /></Menu.Item>
                <Menu.Item key="3">option2</Menu.Item>
                <Menu.Item key="4">option3</Menu.Item>
                <Menu.Item key="5">option4</Menu.Item>
              </SubMenu>
              
            </Menu>
      );
  }
}

export default SiderNav;