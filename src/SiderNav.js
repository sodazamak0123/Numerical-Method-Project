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
                <Menu.Item key="3">False-position Method<Link to="/Falseposition" /></Menu.Item>
                <Menu.Item key="4">Onepoint Iteration Method<Link to="/Onepoint" /></Menu.Item>
                <Menu.Item key="5">Newton Raphson Method<Link to="/Newtonraphson" /></Menu.Item>
                <Menu.Item key="6">Secant Method<Link to="/Secant" /></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title="Matrix">
                <Menu.Item key="7">Cramer's Rule Method<Link to="/Cramers-rule" /></Menu.Item>
                <Menu.Item key="8">Gauss Elimination Method<Link to="/Gauss-elimination" /></Menu.Item>
                <Menu.Item key="9">Gauss Jordan Method<Link to="/Gauss-jordan" /></Menu.Item>
                <Menu.Item key="10">LU Decomposition Method<Link to="/LU-Decomposition" /></Menu.Item>
                <Menu.Item key="11">Conjugate Gradient Method<Link to="/Conjugate-gradient" /></Menu.Item>
                <Menu.Item key="12">Jacobi Method<Link to="/Jacobi" /></Menu.Item>
                <Menu.Item key="13">Gauss-Seidel Method<Link to="/Gauss-seidel" /></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="Interpolation">
                <Menu.Item key="14">Newton Divide<Link to="/Newton-divide" /></Menu.Item>
                <Menu.Item key="15">Lagrange<Link to="/Lagrange" /></Menu.Item>
                <Menu.Item key="16">Cubic Spline<Link to="/Spline" /></Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title="Regression Equation">
                <Menu.Item key="17">Polynomial Regression<Link to="/Polynomial-regression" /></Menu.Item>
                <Menu.Item key="18">Multiple Linear Regression<Link to="/Multiple-linear-regression" /></Menu.Item>
              </SubMenu>
              <Menu.Item key="19">Swagger<Link to="/Swagger" /></Menu.Item>

            </Menu>
      );
  }
}

export default SiderNav;