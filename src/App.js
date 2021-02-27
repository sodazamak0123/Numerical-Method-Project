import './App.css';
import SiderNav from './SiderNav';
import React from 'react';
import { Layout, Typography, Menu, Breadcrumb} from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';



const { SubMenu } = Menu;

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;


class App extends React.Component{

  render(){
    return (
      <div className="App">
        <Layout> 
          <Header style={{padding:'15px'}}>
            <Title style={{color:'white', textAlign:'left'}} level={3}>Numerical Method</Title>
          </Header>
          <Layout>
            <Sider >
              <SiderNav />
            </Sider>
            <Layout>
              <Content>เนื้อหา</Content>
              <Footer>ส่วนล่าง</Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }

}

export default App;
