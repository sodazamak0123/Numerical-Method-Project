import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

class SiderNav extends React.Component {

  render() {
      return(
            <Menu
              mode="inline"
              selectedKeys={this.props.selectedKeys}
              className="sidernav-menu"
            > 
              <Menu.Item key="1">หน้าแรก<Link to="/" /></Menu.Item>
              <SubMenu key="sub1" title="Root of equations">
                <Menu.Item key="2">Bisection Method<Link to="/Bisection" /></Menu.Item>
                <Menu.Item key="3">Falseposition Method<Link to="/Falseposition" /></Menu.Item>
                <Menu.Item key="4">Onepoint Method<Link to="/Onepoint" /></Menu.Item>
                <Menu.Item key="5">Newton Raphson<Link to="/newtonraphson" /></Menu.Item>
                <Menu.Item key="6">Secant<Link to="/secant" /></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title="Matrix">
                <Menu.Item key="7">Cramer's Rule<Link to="/cramers-rule" /></Menu.Item>
                <Menu.Item key="8">Gauss Elimination Method<Link to="/gauss-elimination-method" /></Menu.Item>
                <Menu.Item key="9">Gauss Jordan Method<Link to="/gauss-jordan-method" /></Menu.Item>
                <Menu.Item key="10">LU Decomposition Method<Link to="/lu-decomposition-method" /></Menu.Item>
                <Menu.Item key="11">Conjugate Gradient Method<Link to="/conjugate-gradient" /></Menu.Item>
                <Menu.Item key="12">Jacobi Method<Link to="/jacobi" /></Menu.Item>
                <Menu.Item key="13">Gauss-Seidel Method<Link to="/gauss-seidel" /></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="Interpolation">
                <Menu.Item key="14">Newton Divide<Link to="/newton-divide" /></Menu.Item>
                <Menu.Item key="15">Lagrange<Link to="/lagrange" /></Menu.Item>
                <Menu.Item key="16">Spline<Link to="/spline" /></Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title="Regression Equation">
                <Menu.Item key="17">Regression<Link to="/regression" /></Menu.Item>
              </SubMenu>
              <Menu.Item key="18">Swagger<Link to="/swagger" /></Menu.Item>

            </Menu>
      );
  }
}

export default SiderNav;