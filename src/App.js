import './App.css';
import SiderNav from './SiderNav';
import React from 'react';
import HomeContent from './components/HomeContent';
import BisectionMethod from './components/BisectionMethod';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Route } from 'react-router-dom';
const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;


class App extends React.Component{

  render(){
    return (
      <Layout>
        <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          {/*<div className="logo" />*/}
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
              <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1>Bisection Method</h1>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

}

export default App;
