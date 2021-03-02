import './App.css';
import SiderNav from './SiderNav';
import React from 'react';
import HomeContent from './components/HomeContent';
import BisectionMethod from './components/BisectionMethod';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, HashRouter } from "react-router-dom";
import Onepoint from './components/Onepoint';
import Falseposition from './components/Falseposition';
import NewtonRaphson from './components/NewtonRaphson';
import Secant from './components/Secant';
import CramersRule from './components/CramersRule';
import GaussEliminationMethod from './components/GaussEliminationMethod';
import GaussJordanMethod from './components/GaussJordanMethod';
import LUDecompositionMethod from './components/LUDecompositionMethod';

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;


class App extends React.Component{


  render(){
    return (
      <HashRouter>
        <Layout>
          <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%',paddingLeft:'5px'}}>
            <span style={{color:'white',fontSize:45}}>Numerical Method</span>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background" style={{
            overflow: 'auto',
            height: '100vh',
            marginTop:'64px',
            position: 'fixed',
            left: 0,
            }}>
              <SiderNav />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 ,minHeight:'100vh'}}>
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <Route exact path="/" component={HomeContent} />
                <Route path="/bisectionmethod" component={BisectionMethod} />
                <Route path="/onepoint" component={Onepoint} />
                <Route path="/falseposition" component={Falseposition} />
                <Route path="/newtonraphson" component={NewtonRaphson} />
                <Route path="/secant" component={Secant} />
                <Route path="/cramers-rule" component={CramersRule} />
                <Route path="/gauss-elimination-method" component={GaussEliminationMethod} />
                <Route path="/gauss-jordan-method" component={GaussJordanMethod} />
                <Route path="/lu-decomposition-method" component={LUDecompositionMethod} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }

}

export default App;
