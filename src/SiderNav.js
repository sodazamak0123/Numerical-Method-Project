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
                <Menu.Item key="3">Falseposition Method<Link to="/falseposition" /></Menu.Item>
                <Menu.Item key="4">Onepoint Method<Link to="/onepoint" /></Menu.Item>
                <Menu.Item key="5">Newton Raphson<Link to="/newtonraphson" /></Menu.Item>
                <Menu.Item key="6">Secant<Link to="/secant" /></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title="Matrix">
                <Menu.Item key="7">Cramer's Rule<Link to="/cramers-rule" /></Menu.Item>
                <Menu.Item key="8">Gauss Elimination Method<Link to="/gauss-elimination-method" /></Menu.Item>
                <Menu.Item key="9">Gauss Jordan Method<Link to="/gauss-jordan-method" /></Menu.Item>
                <Menu.Item key="10">LU Decomposition Method<Link to="/lu-decomposition-method" /></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="Interpolation">
                <Menu.Item key="7">Newton Divide<Link to="/newtom-divide" /></Menu.Item>
                <Menu.Item key="8">Lagrange<Link to="/lagrange" /></Menu.Item>
                <Menu.Item key="9">Spline<Link to="/spline" /></Menu.Item>
              </SubMenu>

            </Menu>
      );
  }
}

export default SiderNav;