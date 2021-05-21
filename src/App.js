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
import GaussEliminationMethod from './components/GaussEliminationMethod';
import GaussJordanMethod from './components/GaussJordanMethod';
import LUDecompositionMethod from './components/LUDecompositionMethod';
import NewtonDivide from './components/NewtonDivide';
import Lagrange from './components/Lagrange';
import Spline from './components/Spline';
import SwaggerDoc from './containers/SwaggerDoc';
import Regression from './components/Regression';
import ConjugateGradient from './components/ConjugateGradient';
import Jacobi from './components/Jacobi';

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
                <Route path="/cramers-rule" component={CramersRule} />
                <Route path="/gauss-elimination-method" component={GaussEliminationMethod} />
                <Route path="/gauss-jordan-method" component={GaussJordanMethod} />
                <Route path="/lu-decomposition-method" component={LUDecompositionMethod} />
                <Route path="/conjugate-gradient" component={ConjugateGradient} />
                <Route path="/jacobi" component={Jacobi} />
                <Route path="/newton-divide" component={NewtonDivide} />
                <Route path="/lagrange" component={Lagrange} />
                <Route path="/spline" component={Spline} />
                <Route path="/regression" component={Regression} />
                <Route path="/swagger" component={SwaggerDoc} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }

}

export default App;
