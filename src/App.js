import './App.css';
import SiderNav from './SiderNav';
import React from 'react';
import HomeContent from './components/HomeContent';
import Bisection from './components/Bisection';
import { Layout } from 'antd';
import { Route, BrowserRouter } from "react-router-dom";
import Onepoint from './components/Onepoint';
import Falseposition from './components/Falseposition';
import NewtonRaphson from './components/NewtonRaphson';
import Secant from './components/Secant';
import CramersRule from './components/CramersRule';
import GaussElimination from './components/GaussElimination';
import GaussJordan from './components/GaussJordan';
import LUDecomposition from './components/LUDecomposition';
import GaussSeidel from './components/GaussSeidel';
import NewtonDivide from './components/NewtonDivide';
import Lagrange from './components/Lagrange';
import Spline from './components/Spline';
import SwaggerDoc from './containers/SwaggerDoc';
import PolynomialRegression from './components/PolynomialRegression';
import ConjugateGradient from './components/ConjugateGradient';
import Jacobi from './components/Jacobi';
import MultiLinearRegression from './components/MultiLinearRegression';

const { Header, Content, Sider } = Layout;


class App extends React.Component {

  state = {
    selectedKeys: null
  }

  setKeys = (selectedKeys) => {
    this.setState({
      selectedKeys: selectedKeys
    })
    // console.log(selectedKeys)
  }

  render() {
    return (
      <BrowserRouter basename="/Numerical-Method-Project">
        <Layout>
          <Header className="header">
            <span className="header-text">Numerical Method</span>
          </Header>
          <Layout>
            <Sider width={300} className="sider-layout">
              <SiderNav selectedKeys={this.state.selectedKeys} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content className="content-layout">
                <Route exact path="/" render={() => <HomeContent setKeys={this.setKeys} />} />
                <Route exact path="/Bisection" render={() => <Bisection setKeys={this.setKeys} />} />
                <Route path="/Falseposition" render={() => <Falseposition setKeys={this.setKeys} />} />
                <Route path="/Onepoint" render={() => <Onepoint setKeys={this.setKeys} />} />
                <Route path="/Newtonraphson" render={() => <NewtonRaphson setKeys={this.setKeys} />} />
                <Route path="/Secant" render={() => <Secant setKeys={this.setKeys} />} />
                <Route path="/Cramers-rule" render={() => <CramersRule setKeys={this.setKeys} />} />
                <Route path="/Gauss-elimination" render={() => <GaussElimination setKeys={this.setKeys} />} />
                <Route path="/Gauss-jordan" render={() => <GaussJordan setKeys={this.setKeys} />} />
                <Route path="/LU-Decomposition" render={() => <LUDecomposition setKeys={this.setKeys} />} />
                <Route path="/Conjugate-gradient" render={() => <ConjugateGradient setKeys={this.setKeys} />} />
                <Route path="/Jacobi" render={() => <Jacobi setKeys={this.setKeys} />} />
                <Route path="/Gauss-seidel" render={() => <GaussSeidel setKeys={this.setKeys} />} />
                <Route path="/Newton-divide" render={() => <NewtonDivide setKeys={this.setKeys} />} />
                <Route path="/Lagrange" render={() => <Lagrange setKeys={this.setKeys} />} />
                <Route path="/Spline" render={() => <Spline setKeys={this.setKeys} />} />
                <Route path="/Polynomial-regression" render={() => <PolynomialRegression setKeys={this.setKeys} />}  />
                <Route path="/Multiple-linear-regression" render={() => <MultiLinearRegression setKeys={this.setKeys} />}  />
                <Route path="/Swagger" render={() => <SwaggerDoc setKeys={this.setKeys} />} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }

}

export default App;
