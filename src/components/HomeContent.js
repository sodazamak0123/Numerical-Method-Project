import React from 'react';
import { Layout } from 'antd';
import './Content.css';

const { Content } = Layout;

class HomeContent extends React.Component{

    componentWillMount(){
        this.props.setKeys(['1'])
    }

    render(){
        return(
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <h1 className="header-content">สวัสดีทุกท่านที่เข้ามา
                เว็บไซต์นี้จัดทำขึ้นเพื่อศึกษาการทำเว็บด้วย React 
                </h1>
                <h1 className="header-content">
                </h1>
            </div>
        );
    }

}

export default  HomeContent;