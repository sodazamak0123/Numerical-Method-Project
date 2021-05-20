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
            <div className="content-layout-background">
                <h1 className="content-header">สวัสดีทุกท่านที่เข้ามา
                เว็บไซต์นี้จัดทำขึ้นเพื่อศึกษาการทำเว็บด้วย React 
                </h1>
            </div>
        );
    }

}

export default  HomeContent;